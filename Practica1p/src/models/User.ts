import { Schema, model } from 'mongoose';

// Define el esquema de usuario
const userSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, default: 'usuario' }
});

// Crea y exporta el modelo
export const User = model('User', userSchema);
