import { useState, useEffect } from 'react'
import { FileText, Download, Package, Award, Route, Brain, Calendar } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { getEstadisticas, getLotes, getEvaluaciones } from '../application/useCases.js'

export default function Reportes() {
  const [stats, setStats] = useState(null)
  const [lotes, setLotes] = useState([])
  const [evaluaciones, setEvaluaciones] = useState([])
  const [activeReport, setActiveReport] = useState('produccion')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = () => {
      setStats(getEstadisticas())
      setLotes(getLotes())
      setEvaluaciones(getEvaluaciones())
      setLoading(false)
    }
    setTimeout(loadData, 300)
  }, [])

  const reports = [
    { id: 'produccion', label: 'Producción', icon: Package },
    { id: 'calidad', label: 'Calidad', icon: Award },
    { id: 'trazabilidad', label: 'Trazabilidad', icon: Route },
    { id: 'ia', label: 'Inteligencia Artificial', icon: Brain }
  ]

  const generarReporte = (tipo) => {
    const now = new Date()
    const fecha = now.toLocaleDateString('es-PE')
    const hora = now.toLocaleTimeString('es-PE')
    
    alert(`Generando reporte de ${tipo}...\n\nFecha: ${fecha}\nHora: ${hora}\n\n(En una versión completa, esto generaría un PDF descargable)`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-cafe-600">Cargando reportes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cafe-900">Reportes</h1>
            <p className="text-cafe-600">Generación de informes del sistema</p>
          </div>
        </div>
      </div>

      {/* Selector de reporte */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reports.map(report => {
          const Icon = report.icon
          return (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className={`
                bg-white rounded-xl shadow-sm border-2 p-4 text-left transition-all
                ${activeReport === report.id 
                  ? 'border-amber-500 ring-2 ring-amber-200' 
                  : 'border-cafe-100 hover:border-amber-300'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeReport === report.id ? 'bg-amber-100' : 'bg-cafe-50'
                }`}>
                  <Icon className={`w-5 h-5 ${activeReport === report.id ? 'text-amber-600' : 'text-cafe-600'}`} />
                </div>
                <span className={`font-medium ${activeReport === report.id ? 'text-cafe-900' : 'text-cafe-700'}`}>
                  {report.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Contenido del reporte */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-cafe-900">
            Reporte de {reports.find(r => r.id === activeReport)?.label}
          </h2>
          <button
            onClick={() => generarReporte(activeReport)}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
          >
            <Download className="w-4 h-4" />
            Generar Reporte
          </button>
        </div>

        {/* Reporte de Producción */}
        {activeReport === 'produccion' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.totalLotes}</p>
                <p className="text-sm text-cafe-600">Total Lotes</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.produccionTotal}</p>
                <p className="text-sm text-cafe-600">kg Producidos</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.lotesActivos}</p>
                <p className="text-sm text-cafe-600">Lotes Activos</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{lotes.length}</p>
                <p className="text-sm text-cafe-600">Registros</p>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.produccionMensual || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#edd9c4" />
                  <XAxis dataKey="mes" stroke="#7c5739" />
                  <YAxis stroke="#7c5739" />
                  <Tooltip />
                  <Bar dataKey="produccion" fill="#b8895a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Reporte de Calidad */}
        {activeReport === 'calidad' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{stats?.porCalidad.alta}</p>
                <p className="text-sm text-green-700">Calidad Alta</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-yellow-600">{stats?.porCalidad.media}</p>
                <p className="text-sm text-yellow-700">Calidad Media</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-red-600">{stats?.porCalidad.baja}</p>
                <p className="text-sm text-red-700">Calidad Baja</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.calidadPromedio}</p>
                <p className="text-sm text-cafe-600">Puntaje Promedio</p>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Alta', value: stats?.porCalidad.alta, color: '#22c55e' },
                      { name: 'Media', value: stats?.porCalidad.media, color: '#f59e0b' },
                      { name: 'Baja', value: stats?.porCalidad.baja, color: '#ef4444' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {[
                      { name: 'Alta', value: stats?.porCalidad.alta, color: '#22c55e' },
                      { name: 'Media', value: stats?.porCalidad.media, color: '#f59e0b' },
                      { name: 'Baja', value: stats?.porCalidad.baja, color: '#ef4444' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Reporte de Trazabilidad */}
        {activeReport === 'trazabilidad' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats?.porEstado || {}).map(([estado, count]) => (
                <div key={estado} className="bg-cafe-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-cafe-900">{count}</p>
                  <p className="text-sm text-cafe-600">{estado}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-cafe-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Código</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Productor</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Parcela</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Fecha</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Cantidad</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cafe-100">
                  {lotes.slice(0, 10).map(l => (
                    <tr key={l.id} className="hover:bg-cafe-50">
                      <td className="px-4 py-3 text-sm font-mono font-bold text-cafe-900">{l.codigo}</td>
                      <td className="px-4 py-3 text-sm text-cafe-700">{l.productor}</td>
                      <td className="px-4 py-3 text-sm text-cafe-700">{l.parcela}</td>
                      <td className="px-4 py-3 text-sm text-cafe-700">{l.fecha}</td>
                      <td className="px-4 py-3 text-sm text-cafe-700">{l.cantidad} kg</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                          {l.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reporte de IA */}
        {activeReport === 'ia' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-cafeVerde-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafeVerde-600">87.5%</p>
                <p className="text-sm text-cafeVerde-700">Precisión Modelo</p>
              </div>
              <div className="bg-cafeVerde-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafeVerde-600">5</p>
                <p className="text-sm text-cafeVerde-700">Características</p>
              </div>
              <div className="bg-cafeVerde-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafeVerde-600">Random Forest</p>
                <p className="text-sm text-cafeVerde-700">Algoritmo</p>
              </div>
            </div>
            <div className="bg-cafe-50 rounded-xl p-6">
              <h3 className="font-semibold text-cafe-900 mb-4">Resumen de Predicciones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-cafe-600">Predicciones Alta Calidad</p>
                  <p className="text-2xl font-bold text-green-600">{stats?.porCalidad.alta}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-cafe-600">Predicciones Media Calidad</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats?.porCalidad.media}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-cafe-600">Predicciones Baja Calidad</p>
                  <p className="text-2xl font-bold text-red-600">{stats?.porCalidad.baja}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-cafe-600">Total Predicciones</p>
                  <p className="text-2xl font-bold text-cafe-900">{lotes.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fecha de generación */}
      <div className="bg-cafe-50 rounded-xl p-4 text-center">
        <p className="text-sm text-cafe-600 flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          Reporte generado el {new Date().toLocaleDateString('es-PE')} a las {new Date().toLocaleTimeString('es-PE')}
        </p>
      </div>
    </div>
  )
}