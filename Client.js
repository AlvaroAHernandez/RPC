const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Cambiar esta IP por la del servidor
const SERVER_IP = 'http://187.223.137.77:3000'; // Asegúrate de que esta IP sea accesible

async function sendImage(imagePath) {
    try {
        // Verificar si la imagen existe
        if (!fs.existsSync(imagePath)) {
            console.error('La imagen no existe en la ruta especificada.');
            return;
        }

        // Leer la imagen y convertirla a base64
        const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });

        console.log(' [x] Enviando imagen al servidor...');

        // Enviar la imagen al servidor
        const response = await axios.post(`${SERVER_IP}/process-image`, { image: imageData });

        // Mostrar la respuesta del servidor
        console.log(' [.] Respuesta del servidor:', response.data);
    } catch (error) {
        // Manejar errores
        if (error.response) {
            // El servidor respondió con un código de error (4xx o 5xx)
            console.error('Error en la respuesta del servidor:', error.response.data);
        } else if (error.request) {
            // No se recibió respuesta del servidor
            console.error('No se recibió respuesta del servidor:', error.message);
        } else {
            // Error en la configuración de la solicitud
            console.error('Error al configurar la solicitud:', error.message);
        }
    }
}

// Ruta de la imagen de prueba
const imagePath = path.join(__dirname, 'test_image.jpg'); // Asegúrate de que la imagen exista

// Enviar la imagen al servidor
sendImage(imagePath);