const express = require('express');
const cors = require('cors');
const swagger = require('swagger-node-express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();
app.use(cors());
app.use(express.json());

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
        version: "1.0.0",
        title: "Employee-Test",
        description: "This is description API - Local",
        
        },
        servers: [
            {
                url: 'http://localhost:3003/'
            }
        ],
        
    },
    apis: ["./routes/*.js"],
}
const specs = swaggerJsDoc(options);
const swaggerDocument = require("./swagger.json");
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req, res, next) =>{
    res.json("Welcome to Web of Nhu Huyen")
});
module.exports = app;