const express = require('express');
const router = express.Router();
const sql = require('../db/mysql');

function getDateTime() {
    const date = new Date();
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

// Ruta para obtener todas las solicitudes
router.get('/get', async (req, res) => {
    try {
        console.log('Fetching rows from Votaciones table...');
        const results = await sql.functions.getRows('votaciones');
        console.log('Results get at:', Date() ); // Log para verificar los resultados
        res.json(results);
    } catch (err) {
        console.error('Error fetching rows:', err); // Log para verificar el error
        res.status(500).send(err);
    }
});

// Ruta para obtener todas las solicitudes con la foto completa
router.get("/getCandidatos", async (req, res) => {
    try {
        console.log("Fetching rows from Candidatos table...");
        const results = await sql.functions.getRows("candidatos");
        console.log("Results get at:", Date()); // Log para verificar los resultados

        console.log("Users Send at:", Date()); // Log para verificar los resultados
        // Agregar la URL completa de la foto a cada candidato
        const candidatos = results.map(candidato => ({
            ...candidato,
            foto_url: `http://localhost:5005/${candidato.foto_url}` // Ajusta si la ruta de las fotos está en otra ubicación
        }));
        
        res.json(candidatos);
    } catch (err) {
        console.error("Error fetching rows:", err); // Log para verificar el error
        res.status(500).send(err);
    }
});

module.exports = router;



// Ruta para crear una nueva solicitud
router.post('/create', async (req, res) => {
    try {
        console.log('Request body recibido:');
        const data = req.body;

        // Validar que `data` no sea null, undefined o vacío
        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
            console.error('Error: El cuerpo de la solicitud está vacío o no es válido:', data);
            return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío o no es válido.' });
        }

        console.log('Datos validados para insertar:'); // Log para verificar `data`

        const result = await sql.functions.insertRow('votaciones', data);
        console.log('Incercion Exitosas'); // Log para verificar el resultado

        res.status(201).json({ message: 'Solicitud creada exitosamente'});
    } catch (err) {
        console.error('Error creando la fila:', err);
        res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
});

module.exports = router;