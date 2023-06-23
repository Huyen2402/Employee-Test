const express = require('express');
const cors = require('cors');
const swagger = require('swagger-node-express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();
app.use(cors());
app.use(express.json());

const swaggerDocument = require("./swagger-test.json");
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req, res, next) =>{
    res.json("Welcome to Web of Nhu Huyen")
});
module.exports = app;