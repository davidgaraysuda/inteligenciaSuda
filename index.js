const express = require('express');
const Database = require('./mysqlcon');
const cors = require('cors')
const path=require("path")
const port = 3001;
//Iniciamos en app el servidore web
const app = express()
//Agregamos CORS (politicas de seguridad)
// PAra que otros dominios (react localhost:3000) puedan acceder a nuestros datos
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/IA.html"));
})

app.get('/artificial', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM artificial', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

// Obtener solo un profesor
app.get('/artificial/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM artificial WHERE id = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})

                    //REquest peticion     response  response
app.post('/artificial', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO artificial   
                (hardware, problemasInformaticos, baseDatos, matematicaComputacional, interfacesGraficas) VALUES
                 (?,?,?,?,?)`;

    cn.execute(
        query, [body.hardware, body.problemasInformaticos, body.baseDatos, body.matematicaComputacional, body.interfacesGraficas],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})


//Habilitamos el servidor en el puerto indicado
//En esta caso sera 3001 porque el 3000 ya es usado por React
app.listen(port, () => {
    console.log('Sevidor Express en: http://localhost:' + port);
})