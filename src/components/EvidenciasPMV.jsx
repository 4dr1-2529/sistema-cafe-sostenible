import { useState } from 'react'
import { Camera, Github, Folder, Database, Play, CheckCircle, Image, Code, Terminal, Package } from 'lucide-react'

export default function EvidenciasPMV() {
  const [evidencias] = useState([
    {
      categoria: 'GitHub',
      descripcion: 'Repositorio del proyecto en GitHub',
      icon: Github,
      color: 'bg-gray-900',
      items: [
        'Código fuente completo',
        'Historial de commits',
        'Documentación README',
        'Licencia MIT'
      ]
    },
    {
      categoria: 'Estructura del Proyecto',
      descripcion: 'Organización de archivos y carpetas',
      icon: Folder,
      color: 'bg-blue-500',
      items: [
        'src/domain - Entidades del negocio',
        'src/application - Casos de uso',
        'src/infrastructure - Servicios IA',
        'src/components - UI React'
      ]
    },
    {
      categoria: 'Instalación Frontend',
      descripcion: 'Configuración del entorno React',
      icon: Terminal,
      color: 'bg-green-500',
      items: [
        'npm install - Instalar dependencias',
        'npm run dev - Iniciar servidor',
        'Vite + React + TailwindCSS',
        'Puerto: localhost:5173'
      ]
    },
    {
      categoria: 'Base de Datos',
      descripcion: 'Sistema de almacenamiento local',
      icon: Database,
      color: 'bg-purple-500',
      items: [
        'localStorage del navegador',
        '4 tablas principales',
        'Datos de ejemplo incluidos',
        'Persistencia de datos'
      ]
    },
    {
      categoria: 'App Ejecutándose',
      descripcion: 'Captura de la aplicación en producción',
      icon: Play,
      color: 'bg-amber-500',
      items: [
        'Dashboard con KPIs',
        'Módulo IA activo',
        'Navegación funcional',
        'Diseño responsive'
      ]
    },
    {
      categoria: 'Pruebas de Usuario',
      descripcion: 'Casos de prueba del sistema',
      icon: CheckCircle,
      color: 'bg-red-500',
      items: [
        'Login funcional',
        'Registro de lotes',
        'Evaluación de calidad',
        'Predicciones IA'
      ]
    }
  ])

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Evidencias PMV</h1>
            <p className="text-amber-100">Capturas y documentación del Producto Mínimo Viable</p>
          </div>
        </div>
      </div>

      {/* Info del proyecto */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4">Información del Proyecto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-cafe-50 rounded-lg p-4">
            <p className="text-xs text-cafe-500">Nombre del Proyecto</p>
            <p className="font-semibold text-cafe-900">CAFÉ TRACE AI</p>
          </div>
          <div className="bg-cafe-50 rounded-lg p-4">
            <p className="text-xs text-cafe-500">Versión</p>
            <p className="font-semibold text-cafe-900">1.0.0 (PMV)</p>
          </div>
          <div className="bg-cafe-50 rounded-lg p-4">
            <p className="text-xs text-cafe-500">Tecnología Frontend</p>
            <p className="font-semibold text-cafe-900">React + Vite + TailwindCSS</p>
          </div>
          <div className="bg-cafe-50 rounded-lg p-4">
            <p className="text-xs text-cafe-500">Estado</p>
            <p className="font-semibold text-green-600">✓ Funcional</p>
          </div>
        </div>
      </div>

      {/* Grid de evidencias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {evidencias.map((ev, index) => {
          const Icon = ev.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-cafe-100 overflow-hidden">
              {/* Header de la card */}
              <div className={`${ev.color} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{ev.categoria}</h3>
                    <p className="text-white/80 text-xs">{ev.descripcion}</p>
                  </div>
                </div>
              </div>
              
              {/* Contenido */}
              <div className="p-4">
                <ul className="space-y-2">
                  {ev.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-cafe-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Placeholder para captura */}
              <div className="border-t border-cafe-100 p-4">
                <div className="bg-cafe-50 rounded-lg h-32 flex items-center justify-center">
                  <div className="text-center text-cafe-400">
                    <Image className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Captura de pantalla {index + 1}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Comandos de instalación */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-amber-600" />
          Comandos para Ejecutar el Proyecto
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2"># Clonar o descargar el proyecto</p>
            <code className="text-green-400 font-mono text-sm">git clone https://github.com/usuario/cafe-trace-ai.git</code>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2"># Instalar dependencias</p>
            <code className="text-green-400 font-mono text-sm">cd cafe-trace-ai && npm install</code>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2"># Iniciar servidor de desarrollo</p>
            <code className="text-green-400 font-mono text-sm">npm run dev</code>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2"># Construir para producción</p>
            <code className="text-green-400 font-mono text-sm">npm run build</code>
          </div>
        </div>
      </div>

      {/* Tecnologías usadas */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4">Tecnologías y Herramientas</h2>
        <div className="flex flex-wrap gap-3">
          {['React 18', 'Vite', 'TailwindCSS', 'Recharts', 'Lucide React', 'React Router', 'localStorage', 'JavaScript ES6+'].map((tech, i) => (
            <span key={i} className="px-4 py-2 bg-cafe-100 text-cafe-700 rounded-full text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Nota final */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-800">
          <strong>Nota:</strong> Estas evidencias pueden ser utilizadas para documentar el PMV en el informe académico. 
          Las imágenes de captura se generarían al ejecutar la aplicación y tomar screenshots de cada módulo.
        </p>
      </div>
    </div>
  )
}