import { useState, useEffect } from 'react'
import { Database, Table, Users, Package, Award, Brain, ChevronDown, ChevronRight } from 'lucide-react'
import { getProductores, getLotes, getEvaluaciones, getPredicciones } from '../application/useCases.js'

export default function BaseDatos() {
  const [activeTable, setActiveTable] = useState('productores')
  const [productores, setProductores] = useState([])
  const [lotes, setLotes] = useState([])
  const [evaluaciones, setEvaluaciones] = useState([])
  const [predicciones, setPredicciones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = () => {
      setProductores(getProductores())
      setLotes(getLotes())
      setEvaluaciones(getEvaluaciones())
      setPredicciones(getPredicciones())
      setLoading(false)
    }
    setTimeout(loadData, 300)
  }, [])

  const tables = [
    { id: 'productores', label: 'Productores', icon: Users, count: productores.length },
    { id: 'lotes', label: 'Lotes', icon: Package, count: lotes.length },
    { id: 'evaluaciones', label: 'Evaluaciones', icon: Award, count: evaluaciones.length },
    { id: 'predicciones', label: 'Predicciones IA', icon: Brain, count: predicciones.length }
  ]

  const renderTable = () => {
    switch (activeTable) {
      case 'productores':
        return (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cafe-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Nombre</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Teléfono</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Parcela</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Altitud</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cafe-100">
                {productores.map(p => (
                  <tr key={p.id} className="hover:bg-cafe-50">
                    <td className="px-4 py-3 text-sm font-mono text-cafe-700">{p.id}</td>
                    <td className="px-4 py-3 text-sm text-cafe-900 font-medium">{p.nombre} {p.apellido}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{p.email}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{p.telefono}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{p.parcela}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{p.altitud} msnm</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        p.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 'lotes':
        return (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cafe-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Código</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Productor</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Cantidad</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Humedad</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Temp.</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Tipo</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Estado</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Calidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cafe-100">
                {lotes.map(l => (
                  <tr key={l.id} className="hover:bg-cafe-50">
                    <td className="px-4 py-3 text-sm font-mono font-bold text-cafe-900">{l.codigo}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{l.productor}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{l.cantidad} kg</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{l.humedad}%</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{l.temperatura}°C</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{l.tipoCafe}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                        {l.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        l.calidad === 'Alta' ? 'bg-green-100 text-green-700' :
                        l.calidad === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                        l.calidad === 'Baja' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {l.calidad || 'Sin evaluar'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 'evaluaciones':
        return (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cafe-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Lote</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Aroma</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Acidez</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Cuerpo</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Sabor</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Balance</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Puntaje</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Calificación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cafe-100">
                {evaluaciones.map(e => (
                  <tr key={e.id} className="hover:bg-cafe-50">
                    <td className="px-4 py-3 text-sm font-mono font-bold text-cafe-900">{e.loteCodigo}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{e.aroma}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{e.acidez}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{e.cuerpo}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{e.sabor}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{e.balance}</td>
                    <td className="px-4 py-3 text-sm font-bold text-cafe-900">{e.puntaje}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        e.calificacion === 'Alta' ? 'bg-green-100 text-green-700' :
                        e.calificacion === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {e.calificacion}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 'predicciones':
        return (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cafe-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Lote ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Humedad</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Temp.</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Altitud</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Predicción</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Probabilidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cafe-100">
                {predicciones.length > 0 ? predicciones.map(p => (
                  <tr key={p.id} className="hover:bg-cafe-50">
                    <td className="px-4 py-3 text-sm font-mono text-cafe-700">{p.id}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{p.loteId || '-'}</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{p.entrada?.humedad}%</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{p.entrada?.temperatura}°C</td>
                    <td className="px-4 py-3 text-sm text-cafe-700">{p.entrada?.altitud} msnm</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        p.calidadEstimada === 'Alta' ? 'bg-green-100 text-green-700' :
                        p.calidadEstimada === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {p.calidadEstimada}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-cafe-900">{p.probabilidad}%</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-cafe-400">
                      No hay predicciones registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-cafe-600">Cargando base de datos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Database className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cafe-900">Base de Datos</h1>
            <p className="text-cafe-600">Visualización de tablas del sistema</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
        <div className="flex flex-wrap gap-2">
          {tables.map(table => {
            const Icon = table.icon
            return (
              <button
                key={table.id}
                onClick={() => setActiveTable(table.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                  ${activeTable === table.id 
                    ? 'bg-amber-500 text-cafe-900 font-medium' 
                    : 'bg-cafe-50 text-cafe-600 hover:bg-cafe-100'
                  }
                `}
              >
                <Icon size={18} />
                <span>{table.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTable === table.id ? 'bg-cafe-900 text-white' : 'bg-cafe-200 text-cafe-700'
                }`}>
                  {table.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 overflow-hidden">
        <div className="p-4 border-b border-cafe-100">
          <h2 className="text-lg font-semibold text-cafe-900 flex items-center gap-2">
            <Table className="w-5 h-5 text-amber-600" />
            Tabla: {tables.find(t => t.id === activeTable)?.label}
          </h2>
        </div>
        {renderTable()}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tables.map(table => {
          const Icon = table.icon
          return (
            <div key={table.id} className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cafe-50 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cafe-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-cafe-900">{table.count}</p>
                  <p className="text-xs text-cafe-500">{table.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}