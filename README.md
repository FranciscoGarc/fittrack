# FitTrack - Rastreador de Rutinas de Ejercicio

## Descripción General

FitTrack es una aplicación web progresiva (PWA) diseñada para ayudarte a seguir y gestionar tus rutinas de ejercicio de manera eficiente. La aplicación ofrece dos tipos de rutinas populares: Torso-Pierna y PPL (Push-Pull-Legs), permitiéndote personalizar tu entrenamiento según tus objetivos y preferencias.

## Características Principales

### 🏋️‍♂️ Rutinas de Entrenamiento
- **Torso-Pierna**: Rutina dividida en días alternos para torso y piernas
- **PPL (Push-Pull-Legs)**: Rutina dividida en tres días: empuje, tracción y piernas
- **Cambio dinámico**: Puedes cambiar entre rutinas con un simple interruptor

### ⏱️ Temporizador Integrado
- Temporizador de descanso configurable
- Visualización clara del tiempo restante
- Indicador visual del estado actual (descanso/entrenamiento)

### 📱 Interfaz de Usuario
- Diseño responsive que se adapta a móviles y tablets
- Interfaz oscura moderna con esquema de colores verde esmeralda
- Animaciones suaves y transiciones fluidas
- Iconos intuitivos para navegación fácil

### 🎯 Gestión de Progreso
- Marcado de ejercicios completados
- Reinicio diario de rutinas
- Indicadores visuales de progreso
- Mensajes de felicitación al completar rutinas

## Estructura del Proyecto

```
fittrack/
├── index.html          # Página principal de la aplicación
├── script.js           # Lógica de la aplicación y funcionalidad
├── styles.css          # Estilos personalizados y animaciones
├── images/
│   └── icons/          # Iconos para PWA
│       ├── icon-128x128.png
│       └── icon-512x512.png
└── README.md          # Este archivo
```

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesibilidad
- **CSS3**: Estilos modernos con animaciones y diseño responsive
- **JavaScript ES6+**: Funcionalidad interactiva y lógica de la aplicación
- **Tailwind CSS**: Framework de utilidades CSS para estilos rápidos
- **Inter Font**: Tipografía moderna y legible

## Instalación y Uso

### Opción 1: Uso Directo
1. Abre el archivo `index.html` en tu navegador web preferido
2. La aplicación funcionará inmediatamente sin necesidad de instalación

### Opción 2: Instalación como PWA
1. Abre la aplicación en tu navegador móvil
2. Busca la opción "Agregar a pantalla de inicio" o "Instalar aplicación"
3. Sigue las instrucciones del navegador para completar la instalación

## Cómo Usar la Aplicación

### Selección de Rutina
1. Usa el interruptor en la parte superior para cambiar entre Torso-Pierna y PPL
2. La rutina seleccionada se mostrará automáticamente

### Navegación entre Días
- **Botón izquierdo (←)**: Día anterior
- **Botón derecho (→)**: Día siguiente
- **Botón de reinicio**: Reinicia el progreso del día actual

### Gestión de Ejercicios
1. Marca los ejercicios a medida que los completas
2. El progreso se guarda automáticamente
3. Al completar todos los ejercicios del día, recibirás una felicitación

### Temporizador de Descanso
- El temporizador muestra el tiempo de descanso recomendado
- Puedes usarlo para controlar tus períodos de descanso entre series

## Personalización

### Agregar Nuevos Ejercicios
Para agregar nuevos ejercicios a las rutinas, modifica el archivo `script.js` en la sección de definición de rutinas.

### Cambiar Duración del Descanso
Edita el valor del temporizador en el archivo `script.js` para ajustar la duración del descanso predeterminado.

### Modificar Colores
Los colores principales se pueden cambiar modificando las clases de Tailwind CSS en los archivos HTML y CSS.

## Características Técnicas

- **Diseño Responsive**: Se adapta a pantallas desde 320px hasta escritorio
- **Sin Dependencias Pesadas**: Solo utiliza Tailwind CSS via CDN
- **Almacenamiento Local**: Guarda el progreso en el navegador
- **Accesibilidad**: Etiquetas semánticas y navegación por teclado
- **Rendimiento**: Optimizado para carga rápida en dispositivos móviles

## Compatibilidad

### Navegadores Soportados
- Chrome (versión 60+)
- Firefox (versión 60+)
- Safari (versión 12+)
- Edge (versión 79+)

### Dispositivos
- Smartphones Android e iOS
- Tablets
- Computadoras de escritorio y laptops

## Contribuciones

Este es un proyecto personal, pero las sugerencias y mejoras son bienvenidas. Si deseas contribuir:

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b caracteristica-nueva`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin caracteristica-nueva`)
5. Abre un Pull Request

## Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

---

**Nota**: Esta aplicación fue creada como una herramienta personal para el seguimiento de rutinas de ejercicio. Siempre consulta con un profesional antes de iniciar cualquier programa de ejercicio.