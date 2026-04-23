import { useState, useEffect } from 'react'
import { Route, Package, Search, Eye, QrCode, Calendar, MapPin, User, Thermometer, Droplets, Mountain } from 'lucide-react'
import { getLotes } from '../application/useCases.js'

const estados = {
  Produccion: { color: 'bg-blue-100 text-blue-800', icon: '🌱' },
  Secado: { color: 'bg-yellow-100 text-yellow-800', icon: '☀️' },
  Calidad: { color: 'bg-purple-100 text-purple-800', icon: '🔬' },
  Venta: { color: 'bg-green-100 text-green-800', icon: '💰' }
}

const estadosOrden = ['Produccion', 'Secado', 'Calidad', 'Venta']

export default function Trazabilidad() {
  const [lotes, setLotes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLote, setSelectedLote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLotes = () => {
      const data = getLotes()
      setLotes(data)
      setLoading(false)
    }
    setTimeout(loadLotes, 300)
  }, [])

  const filteredLotes = lotes.filter(lote => 
    lote.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lote.productor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lote.parcela.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getLineaTiempo = (lote) => {
    const linea = []
    const estadoIndex = estadosOrden.indexOf(lote.estado)
    
    estadosOrden.forEach((estado, index) => {
      linea.push({
        estado,
        activo: index <= estadoIndex,
        actual: estado === lote.estado,
        fecha: getFechaPorEstado(lote, estado)
      })
    })
    
    return linea
  }

  const getFechaPorEstado = (lote, estado) => {
    // Simulación de fechas basadas en el estado
    const fechaBase = new Date(lote.fecha)
    const dias = { Produccion: 0, Secado: 7, Calidad: 14, Venta: 21 }
    const fecha = new Date(fechaBase)
    fecha.setDate(fecha.getDate() + dias[estado])
    return fecha.toLocaleDateString('es-PE')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-cafe-600">Cargando trazabilidad...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <Route className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cafe-900">Trazabilidad del Café</h1>
            <p className="text-cafe-600">Seguimiento completo del ciclo de producción</p>
          </div>
        </div>
      </div>

      {/* Buscador */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cafe-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por código, productor o parcela..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
      </div>

      {/* Lista de lotes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-semibold text-cafe-900 mb-3">Lotes Registrados ({filteredLotes.length})</h3>
          {filteredLotes.map(lote => (
            <div
              key={lote.id}
              onClick={() => setSelectedLote(lote)}
              className={`
                bg-white rounded-xl shadow-sm border-2 p-4 cursor-pointer transition-all
                ${selectedLote?.id === lote.id ? 'border-amber-500 ring-2 ring-amber-200' : 'border-cafe-100 hover:border-amber-300'}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono font-bold text-cafe-900">{lote.codigo}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${estados[lote.estado].color}`}>
                  {estados[lote.estado].icon} {lote.estado}
                </span>
              </div>
              <p className="text-sm text-cafe-700">{lote.productor}</p>
              <p className="text-xs text-cafe-500 mt-1">{lote.parcela} • {lote.cantidad} kg</p>
              {lote.calidad && (
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    lote.calidad === 'Alta' ? 'bg-green-100 text-green-700' :
                    lote.calidad === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    ★ {lote.calidad} ({lote.puntaje} pts)
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detalle */}
        <div className="lg:col-span-2">
          {selectedLote ? (
            <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-cafe-900">{selectedLote.codigo}</h3>
                  <p className="text-cafe-600">{selectedLote.productor} • {selectedLote.parcela}</p>
                </div>
                <button className="flex items-center gap-2 bg-cafe-100 text-cafe-700 px-4 py-2 rounded-lg hover:bg-cafe-200 transition-colors">
                  <QrCode size={18} />
                  <span>Simular QR</span>
                </button>
              </div>

              {/* Información del lote */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-cafe-50 rounded-lg p-3">
                  <p className="text-xs text-cafe-500">Cantidad</p>
                  <p className="font-semibold text-cafe-900">{selectedLote.cantidad} kg</p>
                </div>
                <div className="bg-cafe-50 rounded-lg p-3">
                  <p className="text-xs text-cafe-500">Humedad</p>
                  <p className="font-semibold text-cafe-900">{selectedLote.humedad}%</p>
                </div>
                <div className="bg-cafe-50 rounded-lg p-3">
                  <p className="text-xs text-cafe-500">Temperatura</p>
                  <p className="font-semibold text-cafe-900">{selectedLote.temperatura}°C</p>
                </div>
                <div className="bg-cafe-50 rounded-lg p-3">
                  <p className="text-xs text-cafe-500">Altitud</p>
                  <p className="font-semibold text-cafe-900">{selectedLote.altitud} msnm</p>
                </div>
              </div>

              {/* Línea de tiempo */}
              <div className="mb-6">
                <h4 className="font-semibold text-cafe-900 mb-4">Línea de Tiempo</h4>
                <div className="flex items-center justify-between relative">
                  {/* Línea de fondo */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-cafe-200 -translate-y-1/2"></div>
                  
                  {getLineaTiempo(selectedLote).map((item, index) => (
                    <div key={item.estado} className="relative z-10 flex flex-col items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
                        ${item.actual ? 'bg-amber-500 text-cafe-900 ring-4 ring-amber-200' : 
                          item.activo ? 'bg-cafeVerde-500 text-white' : 'bg-cafe-200 text-cafe-500'}
                      `}>
                        {estados[item.estado].icon}
                      </div>
                      <p className={`text-xs mt-2 font-medium ${item.actual ? 'text-amber-600' : 'text-cafe-600'}`}>
                        {item.estado}
                      </p>
                      <p className="text-xs text-cafe-400">{item.fecha}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Datos adicionales */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cafe-50 rounded-lg p-4">
                  <p className="text-xs text-cafe-500 mb-1">Tipo de Café</p>
                  <p className="font-semibold text-cafe-900">{selectedLote.tipoCafe}</p>
                </div>
                <div className="bg-cafe-50 rounded-lg p-4">
                  <p className="text-xs text-cafe-500 mb-1">Tipo de Secado</p>
                  <p className="font-semibold text-cafe-900">{selectedLote.tipoSecado}</p>
                </div>
              </div>

              {selectedLote.calidad && (
                <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm font-semibold text-green-800">Evaluación de Calidad: {selectedLote.calidad}</p>
                  <p className="text-sm text-green-700">Puntaje: {selectedLote.puntaje} puntos</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6 flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center text-cafe-400">
                <Route className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Selecciona un lote para ver su trazabilidad</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}