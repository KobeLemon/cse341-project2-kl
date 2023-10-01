const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Fake Company Api',
        description: 'Fake Company Api'
    },
    host: 'localhost:3000',
    schemes: [ 'http', 'https' ]
};

const outputFile = './swagger.json';
const endpointFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFile, doc);