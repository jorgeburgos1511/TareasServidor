const express = require('express');
const axios = require('axios');
const router = express.Router();

const NEWS_API_URL = "https://newsapi.org/v2";
const API_KEY = process.env.NEWS_API_KEY;

// Obtener fuentes de noticias
router.get('/sources', async (req, res) => {
    try {
        const response = await axios.get(`${NEWS_API_URL}/sources?apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo fuentes de noticias" });
    }
});

// Obtener titulares principales
router.get('/top-headlines', async (req, res) => {
    try {
        const { country, category, q } = req.query;
        const response = await axios.get(`${NEWS_API_URL}/top-headlines`, {
            params: { country, category, q, apiKey: API_KEY },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo titulares" });
    }
});

// Obtener noticias con búsqueda
router.get('/everything', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: "Debe proporcionar un término de búsqueda (q)" });

        const response = await axios.get(`${NEWS_API_URL}/everything`, {
            params: { q, apiKey: API_KEY },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo noticias" });
    }
});

module.exports = router;
