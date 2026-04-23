// Application - Casos de uso
import { Lote, Productor, EvaluacionCalidad, PrediccionIA } from '../domain/entities.js';

// Simulación de base de datos en localStorage
const DB_KEYS = {
  lotes: 'cafe_trace_lotes',
  productores: 'cafe_trace_productores',
  evaluaciones: 'cafe_trace_evaluaciones',
  predicciones: 'cafe_trace_predicciones',
  usuarios: 'cafe_trace_usuarios'
};

// Inicializar datos si no existen
export function inicializarDatos() {
  if (!localStorage.getItem(DB_KEYS.usuarios)) {
    const usuarios = [
      { id: 1, email: 'admin@cafeai.com', password: 'admin123', nombre: 'Administrador', rol: 'admin' },
      { id: 2, email: 'productor@cafeai.com', password: 'prod123', nombre: 'Juan Pérez', rol: 'productor' }
    ];
    localStorage.setItem(DB_KEYS.usuarios, JSON.stringify(usuarios));
  }

  if (!localStorage.getItem(DB_KEYS.productores)) {
    const productores = [
      new Productor({ id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@cafe.com', telefono: '951123456', parcela: 'El Paraiso', altitud: 1800, estado: 'Activo' }),
      new Productor({ id: 2, nombre: 'María', apellido: 'García', email: 'maria@cafe.com', telefono: '952234567', parcela: 'La Esperanza', altitud: 1650, estado: 'Activo' }),
      new Productor({ id: 3, nombre: 'Carlos', apellido: 'Rodríguez', email: 'carlos@cafe.com', telefono: '953345678', parcela: 'San Miguel', altitud: 1900, estado: 'Activo' }),
      new Productor({ id: 4, nombre: 'Ana', apellido: 'López', email: 'ana@cafe.com', telefono: '954456789', parcela: 'Santa Rosa', altitud: 1750, estado: 'Activo' }),
      new Productor({ id: 5, nombre: 'Pedro', apellido: 'Martínez', email: 'pedro@cafe.com', telefono: '955567890', parcela: 'El Roble', altitud: 1850, estado: 'Activo' })
    ];
    localStorage.setItem(DB_KEYS.productores, JSON.stringify(productores.map(p => p.toJSON())));
  }

  if (!localStorage.getItem(DB_KEYS.lotes)) {
    const lotes = [
      new Lote({ id: 1, codigo: 'LOTE-001', productorId: 1, productor: 'Juan Pérez', parcela: 'El Paraiso', fecha: '2026-04-01', cantidad: 150, humedad: 12.5, temperatura: 18, altitud: 1800, tipoCafe: 'Arabica', tipoSecado: 'Natural', estado: 'Venta', calidad: 'Alta', puntaje: 85 }),
      new Lote({ id: 2, codigo: 'LOTE-002', productorId: 2, productor: 'María García', parcela: 'La Esperanza', fecha: '2026-04-05', cantidad: 200, humedad: 14.2, temperatura: 20, altitud: 1650, tipoCafe: 'Arabica', tipoSecado: 'Honey', estado: 'Calidad', calidad: 'Media', puntaje: 72 }),
      new Lote({ id: 3, codigo: 'LOTE-003', productorId: 3, productor: 'Carlos Rodríguez', parcela: 'San Miguel', fecha: '2026-04-10', cantidad: 180, humedad: 11.8, temperatura: 16, altitud: 1900, tipoCafe: 'Catimor', tipoSecado: 'Natural', estado: 'Secado', calidad: null, puntaje: null }),
      new Lote({ id: 4, codigo: 'LOTE-004', productorId: 4, productor: 'Ana López', parcela: 'Santa Rosa', fecha: '2026-04-12', cantidad: 120, humedad: 13.5, temperatura: 19, altitud: 1750, tipoCafe: 'Arabica', tipoSecado: 'Wash', estado: 'Produccion', calidad: null, puntaje: null }),
      new Lote({ id: 5, codigo: 'LOTE-005', productorId: 5, productor: 'Pedro Martínez', parcela: 'El Roble', fecha: '2026-04-15', cantidad: 160, humedad: 12.0, temperatura: 17, altitud: 1850, tipoCafe: 'Typica', tipoSecado: 'Natural', estado: 'Produccion', calidad: null, puntaje: null }),
      new Lote({ id: 6, codigo: 'LOTE-006', productorId: 1, productor: 'Juan Pérez', parcela: 'El Paraiso', fecha: '2026-04-18', cantidad: 140, humedad: 13.8, temperatura: 21, altitud: 1800, tipoCafe: 'Arabica', tipoSecado: 'Honey', estado: 'Calidad', calidad: 'Alta', puntaje: 88 }),
      new Lote({ id: 7, codigo: 'LOTE-007', productorId: 2, productor: 'María García', parcela: 'La Esperanza', fecha: '2026-04-20', cantidad: 190, humedad: 15.1, temperatura: 22, altitud: 1650, tipoCafe: 'Catimor', tipoSecado: 'Natural', estado: 'Secado', calidad: null, puntaje: null })
    ];
    localStorage.setItem(DB_KEYS.lotes, JSON.stringify(lotes.map(l => l.toJSON())));
  }

  if (!localStorage.getItem(DB_KEYS.evaluaciones)) {
    const evaluaciones = [
      new EvaluacionCalidad({ id: 1, loteId: 1, loteCodigo: 'LOTE-001', aroma: 85, acidez: 82, cuerpo: 88, sabor: 84, balance: 86, puntaje: 85, defectos: 0, calificacion: 'Alta', observaciones: 'Excelente calidad, notas frutales', fecha: '2026-04-08', evaludor: 'Q Grader' }),
      new EvaluacionCalidad({ id: 2, loteId: 2, loteCodigo: 'LOTE-002', aroma: 72, acidez: 70, cuerpo: 74, sabor: 71, balance: 73, puntaje: 72, defectos: 2, calificacion: 'Media', observaciones: 'Buena calidad, cuerpo medio', fecha: '2026-04-12', evaludor: 'Q Grader' }),
      new EvaluacionCalidad({ id: 3, loteId: 6, loteCodigo: 'LOTE-006', aroma: 90, acidez: 86, cuerpo: 89, sabor: 88, balance: 87, puntaje: 88, defectos: 0, calificacion: 'Alta', observaciones: 'Excelente, notas a chocolate', fecha: '2026-04-22', evaludor: 'Q Grader' })
    ];
    localStorage.setItem(DB_KEYS.evaluaciones, JSON.stringify(evaluaciones.map(e => e.toJSON())));
  }
}

// Casos de uso - Lotes
export function getLotes() {
  const data = localStorage.getItem(DB_KEYS.lotes);
  return data ? JSON.parse(data) : [];
}

export function getLoteById(id) {
  const lotes = getLotes();
  return lotes.find(l => l.id === parseInt(id));
}

export function createLote(data) {
  const lotes = getLotes();
  const nuevoLote = new Lote({ ...data, id: Date.now() });
  lotes.push(nuevoLote.toJSON());
  localStorage.setItem(DB_KEYS.lotes, JSON.stringify(lotes));
  return nuevoLote;
}

export function updateLote(id, data) {
  const lotes = getLotes();
  const index = lotes.findIndex(l => l.id === parseInt(id));
  if (index !== -1) {
    lotes[index] = { ...lotes[index], ...data };
    localStorage.setItem(DB_KEYS.lotes, JSON.stringify(lotes));
    return lotes[index];
  }
  return null;
}

// Casos de uso - Productores
export function getProductores() {
  const data = localStorage.getItem(DB_KEYS.productores);
  return data ? JSON.parse(data) : [];
}

export function getProductorById(id) {
  const productores = getProductores();
  return productores.find(p => p.id === parseInt(id));
}

// Casos de uso - Evaluaciones
export function getEvaluaciones() {
  const data = localStorage.getItem(DB_KEYS.evaluaciones);
  return data ? JSON.parse(data) : [];
}

export function getEvaluacionByLoteId(loteId) {
  const evaluaciones = getEvaluaciones();
  return evaluaciones.find(e => e.loteId === parseInt(loteId));
}

export function createEvaluacion(data) {
  const evaluaciones = getEvaluaciones();
  const nuevaEvaluacion = new EvaluacionCalidad({ ...data, id: Date.now() });
  evaluaciones.push(nuevaEvaluacion.toJSON());
  localStorage.setItem(DB_KEYS.evaluaciones, JSON.stringify(evaluaciones));
  
  // Actualizar el lote con la calidad
  if (data.loteId) {
    updateLote(data.loteId, {
      calidad: nuevaEvaluacion.calificacion,
      puntaje: nuevaEvaluacion.puntaje
    });
  }
  
  return nuevaEvaluacion;
}

// Casos de uso - Predicciones IA
export function getPredicciones() {
  const data = localStorage.getItem(DB_KEYS.predicciones);
  return data ? JSON.parse(data) : [];
}

export function getPrediccionByLoteId(loteId) {
  const predicciones = getPredicciones();
  return predicciones.filter(p => p.loteId === parseInt(loteId));
}

// Casos de uso - Usuarios
export function getUsuarios() {
  const data = localStorage.getItem(DB_KEYS.usuarios);
  return data ? JSON.parse(data) : [];
}

export function authenticateUser(email, password) {
  const usuarios = getUsuarios();
  return usuarios.find(u => u.email === email && u.password === password);
}

// Estadísticas
export function getEstadisticas() {
  const lotes = getLotes();
  const evaluaciones = getEvaluaciones();
  
  const totalLotes = lotes.length;
  const lotesActivos = lotes.filter(l => l.estado !== 'Venta').length;
  const produccionTotal = lotes.reduce((sum, l) => sum + (l.cantidad || 0), 0);
  
  const lotesConCalidad = lotes.filter(l => l.calidad);
  const calidadPromedio = lotesConCalidad.length > 0
    ? Math.round(lotesConCalidad.reduce((sum, l) => sum + (l.puntaje || 0), 0) / lotesConCalidad.length)
    : 0;
  
  const porCalidad = {
    alta: lotes.filter(l => l.calidad === 'Alta').length,
    media: lotes.filter(l => l.calidad === 'Media').length,
    baja: lotes.filter(l => l.calidad === 'Baja').length
  };
  
  const porEstado = {
    Produccion: lotes.filter(l => l.estado === 'Produccion').length,
    Secado: lotes.filter(l => l.estado === 'Secado').length,
    Calidad: lotes.filter(l => l.estado === 'Calidad').length,
    Venta: lotes.filter(l => l.estado === 'Venta').length
  };
  
  // Producción por mes (simulada)
  const produccionMensual = [
    { mes: 'Ene', produccion: 1200 },
    { mes: 'Feb', produccion: 980 },
    { mes: 'Mar', produccion: 1450 },
    { mes: 'Abr', produccion: 1650 }
  ];
  
  return {
    totalLotes,
    lotesActivos,
    produccionTotal,
    calidadPromedio,
    porCalidad,
    porEstado,
    produccionMensual,
    evaluacionesCount: evaluaciones.length
  };
}