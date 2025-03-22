# Proyecto de Publicaciones

Este proyecto es una API RESTful para gestionar publicaciones de usuarios utilizando **Node.js**, **Express**, **MongoDB**, y **JWT** para autenticación. Los usuarios pueden crear, listar y gestionar publicaciones, con un sistema de autenticación basado en JWT.

## Funcionalidades

1. **Registro de Usuario**: Permite a los usuarios registrarse con un correo electrónico y una contraseña.
2. **Autenticación**: Los usuarios pueden iniciar sesión y recibir un token JWT para autenticar solicitudes futuras.
3. **Gestión de Publicaciones**: Los usuarios pueden crear publicaciones con un título y contenido. Solo los usuarios autenticados pueden crear publicaciones.
4. **Acceso a Publicaciones**: Los usuarios pueden ver todas las publicaciones creadas, incluyendo los detalles del autor.
5. **Protección de Rutas**: Algunas rutas (como la creación de publicaciones) están protegidas y requieren que el usuario esté autenticado.

## Requisitos

- **Node.js**: Asegúrate de tener **Node.js** instalado en tu sistema.
- **MongoDB**: Necesitas tener MongoDB corriendo localmente o utilizar una instancia de MongoDB en la nube como **MongoDB Atlas**.
- **Postman** o herramienta similar para probar la API.

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
