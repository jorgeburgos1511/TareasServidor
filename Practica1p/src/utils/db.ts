import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Conexión a la base de datos establecida con éxito');
  } catch (error) {
    console.error('Error de conexión:', error);
    process.exit(1);
  }
};

export default connectDB;
