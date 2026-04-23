# CAFÉ TRACE AI

## Sistema de Trazabilidad Inteligente y Predictiva para la Gestión del Café Sostenible

**Proyecto Académico de Ingeniería de Sistemas**

---

## 📋 Descripción

CAFÉ TRACE AI es una plataforma web desarrollada para resolver el problema de la baja trazabilidad y digitalización en la producción de café sostenible en la región Junín, Perú.

El sistema integra:
- ✅ Registro digital de producción
- ✅ Trazabilidad completa de lotes
- ✅ Control de calidad Q Grader
- ✅ Predicción inteligente de calidad con Machine Learning
- ✅ Recomendaciones técnicas automatizadas

---

## 🛠️ Tecnologías

| Categoría | Tecnología |
|-----------|-------------|
| Frontend | React 18 + Vite |
| Estilos | TailwindCSS |
| Gráficos | Recharts |
| Iconos | Lucide React |
| Routing | React Router DOM |
| Datos | localStorage (simulado) |
| IA | Random Forest (simulado) |

---

## 📁 Estructura del Proyecto

```
cafe-trace-ai/
├── src/
│   ├── domain/           # Entidades del negocio
│   │   └── entities.js
│   ├── application/      # Casos de uso
│   │   └── useCases.js
│   ├── infrastructure/   # Servicios IA
│   │   └── mlService.js
│   ├── components/      # Componentes React
│   │   ├── Login.jsx
│   │   ├── Layout.jsx
│   │   ├── Dashboard.jsx
│   │   ├── RegistroProduccion.jsx
│   │   ├── Trazabilidad.jsx
│   │   ├── ControlCalidad.jsx
│   │   ├── ModuloIA.jsx
│   │   ├── BaseDatos.jsx
│   │   ├── Reportes.jsx
│   │   ├── EvidenciasPMV.jsx
│   │   ├── Arquitectura.jsx
│   │   └── HistoriasUsuario.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

---

## 🚀 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en navegador
# http://localhost:5173
```

---

## 👤 Credenciales de Demo

| Campo | Valor |
|-------|-------|
| Email | admin@cafeai.com |
| Contraseña | admin123 |

---

## 📱 Módulos del Sistema

1. **Login** - Autenticación de usuarios
2. **Dashboard** - KPIs y predicción IA destacada
3. **Registro Producción** - Formulario de nuevos lotes
4. **Trazabilidad** - Seguimiento de lotes por estado
5. **Control Calidad** - Evaluación sensorial Q Grader
6. **Módulo IA** - Predicción de calidad con ML
7. **Base Datos** - Visualización de tablas
8. **Reportes** - Informes de producción, calidad, trazabilidad e IA
9. **Evidencias PMV** - Documentación del proyecto
10. **Arquitectura** - Diagrama de arquitectura hexagonal
11. **Historias Usuario** - Requisitos funcionales

---

## 🔬 Modelo de Machine Learning

- **Nombre**: Café Quality Predictor v1.0
- **Tipo**: Random Forest Classifier
- **Precisión**: 87.5%
- **Características de entrada**:
  - Humedad (%)
  - Temperatura (°C)
  - Altitud (msnm)
  - Tipo de café
  - Puntaje de calidad

---

## 📊 Capturas de Pantalla

La aplicación incluye:
- Dashboard con indicadores clave
- Gráficos de producción mensual
- Distribución por calidad
- Línea de tiempo de trazabilidad
- Módulo de predicción IA en tiempo real

---

## 🎯 Objetivo del Proyecto

Demostrar un PMV (Producto Mínimo Viable) funcional que:
1. Resuelva el problema de trazabilidad del café en Junín
2. Integre inteligencia artificial para predicción de calidad
3. Muestre arquitectura hexagonal limpia
4. Esté preparado para backend Django o Node.js

---

## 📄 Licencia

MIT License - Proyecto Académico

---

**Desarrollado para:** Proyecto de Ingeniería de Sistemas - Universidad Nacional del Centro del Perú

**Región:** Junín - Perú

**Año:** 2026