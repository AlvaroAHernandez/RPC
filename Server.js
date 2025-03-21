const express = require('express');
const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

app.post('/process-image', async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: 'No se recibió ninguna imagen' });
        }

        console.log('Imagen recibida para procesamiento');

        // Simulación de procesamiento asíncrono
        const processedImage = await new Promise((resolve) => {
            setTimeout(() => {
                console.log('Procesamiento completado');
                resolve(`Imagen procesada: ${image.substring(0, 20)}...`); // Simular un resultado
            }, 3000);
        });

        res.json({ result: processedImage }); // Devolver el resultado
    } catch (error) {
        res.status(500).json({ error: 'Error procesando la imagen' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});