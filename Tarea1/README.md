# TareasServidor
Tareas de Jorge Antonio Flores Burgos
API de Noticias

Este proyecto es un servidor Express que permite obtener noticias desde la API de NewsAPI.

Tecnologías:
Node.js,Express,Axios,dotenv

Requisitos:
Tener Node.js instalado.
Obtener una API Key de NewsAPI.
Crear un archivo .env en la raíz del proyecto con:
NEWS_API_KEY=tu_api_key
PORT=3000

Instalación y Ejecución:
Clonar el repositorio.
Instalar dependencias:
npm install
Iniciar el servidor:
node index.js
Acceder en el navegador a http://localhost:3000.

Endpoints:
GET /sources → Lista fuentes de noticias.
GET /top-headlines → Titulares principales (parámetros opcionales: country, category, q).
GET /everything?q=palabra → Buscar noticias con el término q.

Dependencias:
express → Framework web.
axios → Cliente HTTP.
dotenv → Manejo de variables de entorno.