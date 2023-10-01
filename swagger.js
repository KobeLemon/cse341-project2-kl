const swaggerAutogen = require('swagger-autogen');

// Change needDevMode to true when you need to run localhost:3000 for dev work
// Change needDevMode to false when you need to ship the code & deploy to Render.com
// This allows you to quickly switch between modes with one action, rather than going into swagger.json to change the host & schemes manually
// If you set needDevMode to false, that is meant to be used only when shipping & deploying code to Render.com.
const needDevMode = false
let doc = {info: {title: 'Fake Company API', description: 'Fake Company API'}};

if (needDevMode) {
    doc.host = 'localhost:3000';
    doc.schemes = [ 'http', 'https' ];
} else {
    doc.host = 'cse341-project2-kl.onrender.com';
    doc.schemes = [ 'https' ];
}

console.log(doc)

const outputFile = './swagger.json';
const endpointFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFile, doc);