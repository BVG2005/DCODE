# DCODE · Dragon Code

Plataforma educativa gamificada para aprender programación de forma lúdica, guiada por un dragón sabio. Proyecto de grado y emprendimiento presentado en la Universidad de Manizales (2026).

## Problema que busca resolver
Por que las personas abandonan la programación

## Qué incluye
- **Registro inicial (onboarding):** el usuario elige su nivel, su meta y cuánto tiempo dedicará al día.
- **Cursos:** rutas de aprendizaje con lecciones, cofres de recompensa y "jefes" (Lógica, Python, Java y JavaScript).
- **Aventura:** un mapa tipo videojuego con clases, monstruos, minijuegos y un reto final.
- **Retos y minijuegos:** batalla de lógica contra "bugs" y una carrera con preguntas tipo quiz.
- **Microproyectos:** pequeños proyectos guiados (calculadora, mini RPG, generador de apodos).
- **Academia en vivo:** sesiones en vivo programadas.
- **Gamificación:** experiencia (XP), niveles, monedas, rachas, logros, avatares y temas desbloqueables.
- **Asistente con IA:** el dragón responde dudas de programación con la API de Gemini y da pistas en lugar de la respuesta directa.
- **Accesibilidad e idioma:** tamaño de letra ajustable e interfaz en español e inglés.

## Tecnologías
- React 19 y TypeScript
- Vite
- Tailwind CSS
- React Router
- Motion (animaciones) y Recharts (gráficas)
- API de Gemini (`@google/genai`)

## Cómo ejecutarlo
1. Instala Node.js.
2. Entra a la carpeta de la aplicación: `cd remix_-dcode`
3. Instala las dependencias: `npm install`
4. Crea un archivo `.env.local` con tu clave: `GEMINI_API_KEY=tu_clave`
5. Inicia la aplicación: `npm run dev`
6. Abre `http://localhost:3000`

## Estado del proyecto y limitaciones
Es un prototipo (MVP) para validar la idea:
- Los rankings, la comunidad y varias estadísticas son datos de ejemplo.
- No tiene servidor ni base de datos: el progreso se guarda en el navegador (`localStorage`).
- La clave de Gemini se usa desde el cliente. Para producción, la llamada debe pasar por un servidor propio para no exponerla.

## Próximos pasos
- Servidor y base de datos con cuentas reales de usuario.
- Contenido de cursos y retos completo.
- Llamadas a la IA a través de un backend seguro.



## Autor
Brayan Valencia García · [LinkedIn](https://www.linkedin.com/in/brayan-valencia-garcia-81ab32209/)
