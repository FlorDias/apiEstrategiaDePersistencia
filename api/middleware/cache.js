const getExpeditiousCache = require('express-expeditious');
//guardar en memoria cache las consultas de base de datos  y responder de forma mas rapida las peticiones
//Un middleware express que simplifica el almacenamiento en caché de las respuestas de las solicitudes HTTP de cualquier tipo. 
const defaultOptions = {
    namespace: 'expresscache',
    defaultTtl: '1 minute', // Almacena entradas de caché durante 1 minuto
    statusCodeExpires: {
        404: '5 minutes',
        500: 0 
    }
}

const cacheInit = getExpeditiousCache(defaultOptions)

module.exports = { cacheInit }