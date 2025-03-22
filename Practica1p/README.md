# Proyecto de Publicaciones

Crea y almacena publicaciones en MongoDB con autenticación JWT.

# Requisitos

- Node.js, MongoDB, Postman.

# Instalación

1. Clona y ejecuta:
   ```bash
   git clone <URL>
   npm install
   npm run dev


Configura .env:

MONGO_URI=mongodb://localhost:27017/publicaciones
JWT_SECRET=tu_clave_secreta

Rutas
POST /login: Autentica ydevuelve un token JWT.

POST /publicaciones: Crea publicaciones (requiere token).

GET /publicaciones: Obtiene todas las publicaciones (requiers token).

Probar
Obtén un token con /login.

Crea y obtén publicaciones con /publicaciones.