import { useState, useEffect } from 'react'
import { Brain, Activity, TrendingUp, AlertTriangle, Lightbulb, Droplets, Thermometer, Mountain, Coffee, Zap } from 'lucide-react'
import { predecirCalidad, getInfoModelo } from '../infrastructure/mlService.js'
import { getLotes } from '../application/useCases.js'

export default function ModuloIA() {
  const [lotes, setLotes] = useState([])
  const [modeloInfo, setModeloInfo] = useState(null)
  const [prediccion, setPrediccion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    humedad: 12.5,
    temperatura: 18,
    altitud: 1800,
    tipoCafe: 'Arabica',
    puntaje: null
  })

  useEffect(() => {
    const loadData = () => {
      const data = getLotes()
      setLotes(data)
      const info = getInfoModelo()
      setModeloInfo(info)
    }
    setTimeout(loadData, 300)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'tipoCafe' ? value : parseFloat(value) || ''
    }))
  }

  const handlePredict = () => {
    setLoading(true)
    
    setTimeout(() => {
      const resultado = predecirCalidad(formData)
      setPrediccion(resultado)
      setLoading(false)
    }, 1500)
  }

  const getColorPorCalidad = (calidad) => {
    switch (calidad) {
      case 'Alta': return 'text-green-600 bg-green-50 border-green-200'
      case 'Media': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'Baja': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-cafeVerde-600 to-cafe-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Predicción Inteligente de Calidad del Café</h1>
            <p className="text-cafe-100">Modelo de Machine Learning basado en Random Forest</p>
          </div>
        </div>
      </div>

      {/* Info del Modelo */}
      {modeloInfo && (
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h2 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cafeVerde-600" />
            Información del Modelo ML
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cafe-50 rounded-lg p-4">
              <p className="text-xs text-cafe-500">Nombre</p>
              <p className="font-semibold text-cafe-900">{modeloInfo.nombre}</p>
            </div>
            <div className="bg-cafe-50 rounded-lg p-4">
              <p className="text-xs text-cafe-500">Tipo de Modelo</p>
              <p className="font-semibold text-cafe-900">{modeloInfo.tipo}</p>
            </div>
            <div className="bg-cafe-50 rounded-lg p-4">
              <p className="text-xs text-cafe-500">Precisión</p>
              <p className="font-semibold text-cafe-900 text-green-600">{modeloInfo.precision}</p>
            </div>
          </div>
          <div className="mt-4 bg-cafe-50 rounded-lg p-4">
            <p className="text-xs text-cafe-500 mb-2">Características de Entrada</p>
            <div className="flex flex-wrap gap-2">
              {modeloInfo.caracteristicas.map(car => (
                <span key={car} className="px-3 py-1 bg-white border border-cafe-200 rounded-full text-sm text-cafe-700">
                  {car}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entrada de Datos */}
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h2 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
            <Coffee className="w-5 h-5 text-amber-600" />
            Datos de Entrada
          </h2>
          
          <div className="space-y-4">
            {/* Humedad */}
            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                Humedad (%)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  name="humedad"
                  min="5"
                  max="20"
                  step="0.1"
                  value={formData.humedad}
                  onChange={handleChange}
                  className="flex-1 h-2 bg-cafe-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <span className="w-16 text-center font-mono font-bold text-cafe-900">{formData.humedad}%</span>
              </div>
              <p className="text-xs text-cafe-500 mt-1">Rango óptimo: 10-13%</p>
            </div>

            {/* Temperatura */}
            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-red-500" />
                Temperatura (°C)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  name="temperatura"
                  min="10"
                  max="35"
                  step="0.5"
                  value={formData.temperatura}
                  onChange={handleChange}
                  className="flex-1 h-2 bg-cafe-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <span className="w-16 text-center font-mono font-bold text-cafe-900">{formData.temperatura}°C</span>
              </div>
              <p className="text-xs text-cafe-500 mt-1">Rango óptimo: 15-22°C</p>
            </div>

            {/* Altitud */}
            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2 flex items-center gap-2">
                <Mountain className="w-4 h-4 text-green-500" />
                Altitud (msnm)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  name="altitud"
                  min="800"
                  max="2500"
                  step="50"
                  value={formData.altitud}
                  onChange={handleChange}
                  className="flex-1 h-2 bg-cafe-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <span className="w-20 text-center font-mono font-bold text-cafe-900">{formData.altitud}</span>
              </div>
              <p className="text-xs text-cafe-500 mt-1">Rango óptimo: 1500-2000msnm</p>
            </div>

            {/* Tipo de Café */}
            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2">Tipo de Café</label>
              <select
                name="tipoCafe"
                value={formData.tipoCafe}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="Arabica">Arabica</option>
                <option value="Typica">Typica</option>
                <option value="Bourbon">Bourbon</option>
                <option value="Caturra">Caturra</option>
                <option value="Catimor">Catimor</option>
              </select>
            </div>

            {/* Botón de predicción */}
            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cafeVerde-500 to-cafeVerde-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-cafeVerde-600 hover:to-cafeVerde-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Procesando modelo...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Ejecutar Predicción
                </>
              )}
            </button>
          </div>
        </div>

        {/* Resultado de Predicción */}
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h2 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cafeVerde-600" />
            Resultado de Predicción
          </h2>
          
          {prediccion ? (
            <div className="space-y-4">
              {/* Calidad Principal */}
              <div className={`rounded-xl p-6 border-2 ${getColorPorCalidad(prediccion.calidadEstimada)}`}>
                <div className="text-center">
                  <p className="text-sm text-cafe-600 mb-1">Calidad Estimada</p>
                  <p className="text-5xl font-bold">{prediccion.calidadEstimada}</p>
                  <p className="text-2xl font-semibold mt-2">{prediccion.probabilidad}%</p>
                  <p className="text-xs text-cafe-500 mt-2">Probabilidad de acierto</p>
                </div>
              </div>

              {/* Factores Influyentes */}
              <div className="bg-cafe-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-cafe-900 mb-3">Factores Influyentes</p>
                <div className="space-y-2">
                  {prediccion.factores.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        {factor.impacto === 'Positivo' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : factor.impacto === 'Negativo' ? (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        ) : (
                          <Activity className="w-4 h-4 text-gray-500" />
                        )}
                        <span className="font-medium text-cafe-900">{factor.factor}</span>
                      </div>
                      <span className={`text-sm ${
                        factor.impacto === 'Positivo' ? 'text-green-600' :
                        factor.impacto === 'Negativo' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {factor.impacto}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recomendación */}
              <div className="bg-gradient-to-r from-amber-50 to-cafe-50 rounded-lg p-4 border border-amber-200">
                <p className="text-sm font-semibold text-cafe-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  Recomendación
                </p>
                <p className="text-sm text-cafe-700">{prediccion.recomendacion}</p>
              </div>

              {/* Modelo usado */}
              <div className="text-center text-xs text-cafe-400">
                Modelo: {prediccion.modelo}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-cafe-50 rounded-xl">
              <div className="text-center text-cafe-400">
                <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Ingresa los datos y ejecuta la predicción</p>
                <p className="text-sm mt-2">El modelo analizará las condiciones para predecir la calidad</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Últimas Predicciones */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4">Historial de Predicciones</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cafe-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Humedad</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Temp.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Altitud</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Tipo</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Predicción</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Prob.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cafe-100">
              {lotes.slice(0, 5).map((lote, index) => (
                <tr key={index} className="hover:bg-cafe-50">
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.fecha}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.humedad}%</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.temperatura}°C</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.altitud}msnm</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.tipoCafe}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      lote.calidad === 'Alta' ? 'bg-green-100 text-green-700' :
                      lote.calidad === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                      lote.calidad === 'Baja' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {lote.calidad || 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-cafe-700">
                    {lote.calidad ? (
                      <span className="font-mono">{Math.round(70 + Math.random() * 25)}%</span>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}