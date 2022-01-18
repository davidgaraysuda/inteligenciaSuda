const express = require ('express');
const Database = require ('./mysqlcon');
const cors = require('cors')
const port = 3001;
//Iniciamos en app el servidore web
const app = express()
//Agregamos CORS (politicas de seguridad)
// PAra que otros dominios (react localhost:3000) puedan acceder a nuestros datos
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Servidor OK !!!');
})

app.get('/cards', (req, res)=>
{ 
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT * FROM profesor', [],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
 
})

app.post('/cards', (req, res)=>{
    const body = req.body;
    res.json(body)
})

//Habilitamos el servidor en el puerto indicado
//En esta caso sera 3001 porque el 3000 ya es usado por React
app.listen(port,     () => {
    console.log('Sevidor Express en: http://localhost:'+port);
})