import { Schema, model } from 'mongoose';

// Define el esquema de publicación
const postSchema = new Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  autor: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

// Crea y exporta el modelo
export const Post = model('Post', postSchema);
