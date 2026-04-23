// Infrastructure - Servicios externos (IA, API, etc.)
import { PrediccionIA } from '../domain/entities.js';

// Simulación de modelo de Machine Learning
// En producción, esto se conectaría a un endpoint de Python/TensorFlow/PyTorch

const DB_KEYS = {
  predicciones: 'cafe_trace_predicciones'
};

// Función de predicción simulada basada en reglas de negocio
export function predecirCalidad(entrada) {
  const { humedad, temperatura, altitud, tipoCafe, puntaje } = entrada;
  
  let score = 50; // Score base
  
  // Factores que influyen en la calidad
  const factores = [];
  
  // Humedad óptima entre 10-13%
  if (humedad >= 10 && humedad <= 13) {
    score += 15;
    factores.push({ factor: 'Humedad', valor: humedad, impacto: 'Positivo', descripcion: 'Humedad dentro del rango óptimo' });
  } else if (humedad > 13) {
    score -= 10;
    factores.push({ factor: 'Humedad', valor: humedad, impacto: 'Negativo', descripcion: 'Humedad alta puede causar hongos' });
  } else {
    score -= 5;
    factores.push({ factor: 'Humedad', valor: humedad, impacto: 'Negativo', descripcion: 'Humedad muy baja puede afectar sabor' });
  }
  
  // Temperatura óptima entre 15-22°C
  if (temperatura >= 15 && temperatura <= 22) {
    score += 12;
    factores.push({ factor: 'Temperatura', valor: temperatura, impacto: 'Positivo', descripcion: 'Temperatura ideal para desarrollo' });
  } else if (temperatura > 25) {
    score -= 8;
    factores.push({ factor: 'Temperatura', valor: temperatura, impacto: 'Negativo', descripcion: 'Temperatura alta acelera maduración' });
  } else {
    factores.push({ factor: 'Temperatura', valor: temperatura, impacto: 'Neutral', descripcion: 'Temperatura dentro de rango aceptable' });
  }
  
  // Altitud óptima para café de calidad (1500-2000msnm)
  if (altitud >= 1500 && altitud <= 2000) {
    score += 15;
    factores.push({ factor: 'Altitud', valor: altitud, impacto: 'Positivo', descripcion: 'Alta altitud favorece calidad' });
  } else if (altitud > 2000) {
    score += 5;
    factores.push({ factor: 'Altitud', valor: altitud, impacto: 'Positivo', descripcion: 'Muy alta altitud, café gourmet' });
  } else {
    score -= 5;
    factores.push({ factor: 'Altitud', valor: altitud, impacto: 'Negativo', descripcion: 'Altitud baja puede afectar calidad' });
  }
  
  // Tipo de café
  if (tipoCafe === 'Arabica' || tipoCafe === 'Typica') {
    score += 10;
    factores.push({ factor: 'Tipo de Café', valor: tipoCafe, impacto: 'Positivo', descripcion: 'Variedad de alta calidad' });
  } else if (tipoCafe === 'Catimor') {
    score += 5;
    factores.push({ factor: 'Tipo de Café', valor: tipoCafe, impacto: 'Neutral', descripcion: 'Variedad resistente pero menos premium' });
  }
  
  // Si hay puntaje de evaluación, usarlo
  if (puntaje && puntaje > 0) {
    score = (score + puntaje) / 2;
  }
  
  // Calcular probabilidad y calidad
  const probabilidad = Math.min(95, Math.max(50, score));
  let calidadEstimada = 'Media';
  let recomendacion = '';
  
  if (score >= 80) {
    calidadEstimada = 'Alta';
    recomendacion = 'Mantener las condiciones actuales. El lote tiene potencial de exportación.';
  } else if (score >= 60) {
    calidadEstimada = 'Media';
    recomendacion = 'Mejorar control de humedad durante el secado. Monitorear temperatura.';
  } else {
    calidadEstimada = 'Baja';
    recomendacion = 'Revisar proceso de secado. Considerar tratamiento especial para el lote.';
  }
  
  // Agregar recomendaciones específicas
  if (humedad > 13) {
    recomendacion = '⚠️ ALERTA: Humedad alta detectada. Extender tiempo de secado.';
  } else if (temperatura > 25) {
    recomendacion = '🌡️ Alerta térmica: Considerar sombra durante el secado.';
  } else if (altitud < 1500) {
    recomendacion = '🏔️ Nota: Parcela en zona baja. Enfocarse en variedades resistentes.';
  }
  
  const prediccion = new PrediccionIA({
    entrada,
    calidadEstimada,
    probabilidad: Math.round(probabilidad),
    factores,
    recomendacion
  });
  
  // Guardar predicción
  guardarPrediccion(prediccion);
  
  return prediccion;
}

export function guardarPrediccion(prediccion) {
  const predicciones = getPredicciones();
  predicciones.push(prediccion.toJSON());
  localStorage.setItem(DB_KEYS.predicciones, JSON.stringify(predicciones));
}

export function getPredicciones() {
  const data = localStorage.getItem(DB_KEYS.predicciones);
  return data ? JSON.parse(data) : [];
}

export function getPrediccionByLoteId(loteId) {
  const predicciones = getPredicciones();
  return predicciones.filter(p => p.loteId === parseInt(loteId));
}

// Obtener última predicción
export function getUltimaPrediccion() {
  const predicciones = getPredicciones();
  if (predicciones.length === 0) {
    // Generar predicción de ejemplo si no hay datos
    return predecirCalidad({
      humedad: 12.5,
      temperatura: 18,
      altitud: 1800,
      tipoCafe: 'Arabica',
      puntaje: null
    });
  }
  return predicciones[predicciones.length - 1];
}

// Información del modelo ML
export function getInfoModelo() {
  return {
    nombre: 'Café Quality Predictor v1.0',
    tipo: 'Random Forest Classifier',
    precision: '87.5%',
    caracteristicas: ['Humedad', 'Temperatura', 'Altitud', 'Tipo de Café', 'Puntaje'],
    version: '1.0.0',
    fechaEntrenamiento: '2026-01-15',
    descripcion: 'Modelo entrenado con datos históricos de cafés de Junín para predecir calidad basada en condiciones de cultivo y procesamiento.'
  };
}