const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const exphbs = require('express-handlebars');

const app = express();

// Configuración de Handlebars
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'public', 'uploads');
    // Crear la carpeta si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Error: Solo se permiten imágenes JPG o PNG.'));
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.redirect('/gallery');
});

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).render('upload', { 
      error: 'No se seleccionó ningún archivo o el archivo no es válido.' 
    });
  }
  res.redirect('/gallery');
}, (error, req, res, next) => {
  // Manejo de errores de Multer
  res.status(400).render('upload', { error: error.message });
});

app.get('/gallery', (req, res) => {
  const uploadPath = path.join(__dirname, 'public', 'uploads');
  
  // Leer los archivos de la carpeta uploads
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      console.error(err);
      files = [];
    }
    
    // Filtrar solo imágenes
    const images = files.filter(file => 
      ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())
    );
    
    res.render('gallery', { 
      images: images,
      hasImages: images.length > 0
    });
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});