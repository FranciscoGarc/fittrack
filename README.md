# FitTrack - Rastreador de Ejercicios

FitTrack es una aplicación web progresiva (PWA) simple diseñada para ayudarte a seguir tu progreso en la rutina de ejercicios PHUL (Power Hypertrophy Upper Lower). Está construida con HTML, CSS vainilla y JavaScript, y utiliza Tailwind CSS para los estilos.

## Características

*   **Seguimiento de Rutina PHUL:** Sigue fácilmente los días de entrenamiento de Fuerza Superior, Fuerza Inferior, Hipertrofia Superior e Hipertrofia Inferior.
*   **Temporizador de Descanso:** Un temporizador de descanso integrado de 2 minutos se activa después de completar cada serie.
*   **Persistencia de Datos:** Tu progreso se guarda en el almacenamiento local de tu navegador, para que puedas continuar donde lo dejaste.
*   **Funcionalidad PWA:** Instala la aplicación en tu dispositivo para acceder sin conexión.
*   **Diseño Responsivo:** Interfaz fácil de usar en dispositivos de escritorio y móviles.
*   **Notificaciones Sonoras:** Recibe una alerta sonora cuando tu temporizador de descanso termine.

## Estructura del Proyecto

*   `index.html`: La estructura principal de la aplicación.
*   `styles.css`: Estilos personalizados adicionales a Tailwind CSS.
*   `script.js`: Contiene toda la lógica de JavaScript para la aplicación, incluyendo:
    *   Manejo del estado del entrenamiento.
    *   Funciones del temporizador.
    *   Renderizado de la interfaz de usuario.
    *   Manejo de eventos.
    *   Registro del Service Worker.
*   `manifest.json`: Define los metadatos de la PWA.
*   `service-worker.js`: Gestiona la funcionalidad sin conexión y el almacenamiento en caché.
*   `images/`: Contiene los iconos de la aplicación.

## Cómo Empezar

1.  **Clona el repositorio (opcional):**
    Si quieres ejecutar esto localmente o modificarlo:
    ```bash
    git clone https://github.com/tu-usuario/fittrack.git
    cd fittrack
    ```
    (Reemplaza `https://github.com/tu-usuario/fittrack.git` con la URL real del repositorio si está disponible)

2.  **Abre `index.html` en tu navegador:**
    Simplemente abre el archivo `index.html` en tu navegador web preferido.

3.  **Instala la PWA (Opcional):**
    Busca el botón "Instalar" o "Añadir a la pantalla de inicio" en la barra de direcciones de tu navegador para usar FitTrack como una aplicación independiente.

## Uso

*   **Navegación:** Usa los botones de flecha para moverte entre los días de entrenamiento.
*   **Marcar Series:** Marca las casillas de verificación a medida que completas cada serie. La siguiente serie disponible se desbloqueará.
*   **Temporizador de Descanso:** El temporizador de descanso de 2 minutos comenzará automáticamente después de marcar una serie.
*   **Reiniciar Día:** Haz clic en el icono de reinicio junto al título del día para borrar el progreso del día actual.
*   **Modal de Felicitación:** Aparecerá un mensaje de felicitación cuando completes todos los ejercicios de un día.

## Contribuir

Las contribuciones son bienvenidas. Si tienes ideas para mejorar o encuentras algún error, por favor abre un issue o envía un pull request.

## Próximos Pasos Potenciales (Ideas)

*   Permitir rutinas personalizables.
*   Añadir seguimiento del historial de entrenamiento.
*   Implementar sincronización en la nube.
*   Mejorar las opciones de personalización del temporizador.

---

Este README proporciona una visión general de la aplicación FitTrack, su estructura y cómo usarla.
