require('dotenv').config();
console.log("NEWS_API_KEY:", process.env.NEWS_API_KEY);
console.log("PORT:", process.env.PORT);


const express = require('express');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/news', newsRoutes);

app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
