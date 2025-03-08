const express = require('express');
const router = express.Router();
const sql = require('../db/mysql');
require('dotenv').config();

const apiHost = process.env.API_HOST || 'http://localhost';


function getDateTime() {
    const date = new Date();
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

// Ruta para obtener todas las solicitudes
router.get('/get', async (req, res) => {
    try {
        const results = await sql.functions.getRows('votaciones');
        res.json(results);
    } catch (err) {
        console.error('Error fetching rows:', err); // Log para verificar el error
        res.status(500).send(err);
    }
});

// Ruta para obtener todas las solicitudes con la foto completa
router.get("/getCandidatos", async (req, res) => {
    try {
        const results = await sql.functions.getRows("candidatos");
        const candidatos = results.map(candidato => ({
            ...candidato,
            foto_url: `${apiHost}:5005/${candidato.foto_url}` // Ajusta si la ruta de las fotos está en otra ubicación
        }));
        
        res.json(candidatos);
    } catch (err) {
        console.error("Error fetching rows:", err); // Log para verificar el error
        res.status(500).send(err);
    }
});

// Ruta para obtener la cantidad de votos por candidato
router.get('/getCandidateVotes', async (req, res) => {
    try {
        const results = await sql.functions.getCandidateVotes();
        console.log("Candidate votes retrieved at:", Date()); // Log para verificar los resultados
        res.json(results);
    } catch (err) {
        console.error("Error fetching candidate votes:", err);
        res.status(500).send(err);
    }
});


module.exports = router;



// Ruta para crear una nueva solicitud
router.post('/create', async (req, res) => {
    try {
        const data = req.body;

        // Validar que `data` no sea null, undefined o vacío
        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
            console.error('Error: El cuerpo de la solicitud está vacío o no es válido:', data);
            return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío o no es válido.' });
        }

        const result = await sql.functions.insertRow('votaciones', data);
        console.log('Incercion Exitosas', Date()); // Log para verificar el resultado

        res.status(201).json({ message: 'Solicitud creada exitosamente'});
    } catch (err) {
        console.error('Error creando la fila:', err);
        res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
});

module.exports = router;