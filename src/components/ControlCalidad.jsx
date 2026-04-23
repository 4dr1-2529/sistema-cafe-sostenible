import { useState, useEffect } from 'react'
import { Award, Save, CheckCircle, AlertCircle } from 'lucide-react'
import { getLotes, createEvaluacion } from '../application/useCases.js'

export default function ControlCalidad() {
  const [lotes, setLotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [formData, setFormData] = useState({
    loteId: '',
    loteCodigo: '',
    aroma: 70,
    acidez: 70,
    cuerpo: 70,
    sabor: 70,
    balance: 70,
    defectos: 0,
    observaciones: '',
    evaludor: 'Q Grader'
  })

  useEffect(() => {
    const loadLotes = () => {
      const data = getLotes().filter(l => l.estado !== 'Venta')
      setLotes(data)
    }
    setTimeout(loadLotes, 200)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleLoteChange = (e) => {
    const loteId = parseInt(e.target.value)
    const lote = lotes.find(l => l.id === loteId)
    
    setFormData(prev => ({
      ...prev,
      loteId: loteId,
      loteCodigo: lote?.codigo || ''
    }))
  }

  const calcularPuntaje = () => {
    const promedio = (formData.aroma + formData.acidez + formData.cuerpo + formData.sabor + formData.balance) / 5
    return Math.round(promedio)
  }

  const getCalificacion = (puntaje) => {
    if (puntaje >= 80) return 'Alta'
    if (puntaje >= 60) return 'Media'
    return 'Baja'
  }

  const getRecomendacion = (calificacion) => {
    switch (calificacion) {
      case 'Alta':
        return 'Lote de excelente calidad. Apto para exportación y mercados premium.'
      case 'Media':
        return 'Lote de buena calidad. Puede comercializarse en mercados locales.'
      case 'Baja':
        return 'Lote con defectos. Considerar mezcla con lotes de mejor calidad.'
      default:
        return ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)

    setTimeout(() => {
      const puntaje = calcularPuntaje()
      const calificacion = getCalificacion(puntaje)
      
      const nuevaEvaluacion = createEvaluacion({
        ...formData,
        puntaje,
        calificacion,
        fecha: new Date().toISOString().split('T')[0]
      })

      setSuccess({
        evaluacion: nuevaEvaluacion,
        puntaje,
        calificacion,
        recomendacion: getRecomendacion(calificacion)
      })

      // Resetear
      setFormData(prev => ({
        ...prev,
        loteId: '',
        loteCodigo: '',
        aroma: 70,
        acidez: 70,
        cuerpo: 70,
        sabor: 70,
        balance: 70,
        defectos: 0,
        observaciones: ''
      }))

      setLoading(false)
    }, 1000)
  }

  const puntaje = calcularPuntaje()
  const calificacion = getCalificacion(puntaje)

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cafe-900">Control de Calidad</h1>
            <p className="text-cafe-600">Evaluación sensorial del café según protocolo Q Grader</p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selección de lote */}
          <div>
            <label className="block text-sm font-medium text-cafe-700 mb-2">Lote a Evaluar *</label>
            <select
              name="loteId"
              value={formData.loteId}
              onChange={handleLoteChange}
              className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">Seleccionar lote</option>
              {lotes.map(lote => (
                <option key={lote.id} value={lote.id}>
                  {lote.codigo} - {lote.productor} ({lote.cantidad} kg)
                </option>
              ))}
            </select>
          </div>

          {/* Parámetros de evaluación */}
          <div className="bg-cafe-50 rounded-xl p-5 border border-cafe-200">
            <h3 className="font-semibold text-cafe-900 mb-4">Parámetros de Cata (0-100)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {['aroma', 'acidez', 'cuerpo', 'sabor', 'balance'].map(param => (
                <div key={param}>
                  <label className="block text-sm font-medium text-cafe-700 mb-2 capitalize">{param}</label>
                  <input
                    type="range"
                    name={param}
                    min="0"
                    max="100"
                    value={formData[param]}
                    onChange={handleChange}
                    className="w-full h-2 bg-cafe-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="text-center mt-1">
                    <span className="text-lg font-bold text-cafe-900">{formData[param]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Defectos */}
          <div>
            <label className="block text-sm font-medium text-cafe-700 mb-2">Número de Defectos</label>
            <input
              type="number"
              name="defectos"
              value={formData.defectos}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-sm font-medium text-cafe-700 mb-2">Observaciones</label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows="3"
              placeholder="Notas sobre el perfil de taza, notas sensoriales, etc."
              className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Preview del resultado */}
          <div className="bg-gradient-to-r from-purple-50 to-cafe-50 rounded-xl p-5 border border-purple-200">
            <h3 className="font-semibold text-cafe-900 mb-3">Vista Previa</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-cafe-600">Puntaje</p>
                <p className="text-3xl font-bold text-cafe-900">{puntaje}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-cafe-600">Calidad</p>
                <p className={`text-3xl font-bold ${
                  calificacion === 'Alta' ? 'text-green-600' :
                  calificacion === 'Media' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {calificacion}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-cafe-600">Estado</p>
                <p className="text-lg font-semibold text-cafe-900">{formData.loteId ? 'Listo para guardar' : 'Sin lote'}</p>
              </div>
            </div>
          </div>

          {/* Botón */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !formData.loteId}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Evaluando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar Evaluación
                </>
              )}
            </button>
          </div>
        </form>

        {/* Resultado */}
        {success && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800">Evaluación guardada exitosamente</h3>
                <div className="mt-3 grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-3 border border-green-200 text-center">
                    <p className="text-2xl font-bold text-cafe-900">{success.puntaje}</p>
                    <p className="text-xs text-cafe-600">Puntaje</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200 text-center">
                    <p className={`text-2xl font-bold ${
                      success.calificacion === 'Alta' ? 'text-green-600' :
                      success.calificacion === 'Media' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {success.calificacion}
                    </p>
                    <p className="text-xs text-cafe-600">Calidad</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200 text-center">
                    <p className="text-sm text-cafe-900">{success.evaluacion.defectos}</p>
                    <p className="text-xs text-cafe-600">Defectos</p>
                  </div>
                </div>
                <div className="mt-3 bg-white rounded-lg p-3 border border-green-200">
                  <p className="text-sm font-semibold text-green-800">Recomendación Técnica:</p>
                  <p className="text-sm text-green-700 mt-1">{success.recomendacion}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}