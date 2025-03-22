import express from 'express';
import connectDB from './utils/db';  // Importamos la función de conexión
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'; // Rutas de usuario
import postRoutes from './routes/postRoutes'; // Rutas de publicaciones

dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('OK');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
