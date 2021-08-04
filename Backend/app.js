const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const mercadopago = require('mercadopago')

app.use(express.json())
app.use(express.urlencoded({extended:false}));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '35143980f',
    database : 'elixir'
  });

   
  connection.connect((error) => {
      if (error) throw error;
      console.log('Conectado a la base de datos')
  });



mercadopago.configure({
    access_token: 'APP_USR-8924158065874778-041300-eae4d0548aed651909f358780a51b411-742498217'
  });

app.post('/cobro', (req, res) => {
    console.log(req.body)
    let preference = {
        items: [
          {
            title: req.body.Productos,
            unit_price: parseInt(req.body.precio),
            quantity: 1,
          }
        ]
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
        res.redirect(response.body.init_point)
      
      }).catch(function(error){
        console.log(error);
      });
})

app.get('/vinos', (req, res) => {
    const sql = `SELECT idvinos, nombrevino, precio, imagen, nombrebodega FROM vinos INNER JOIN bodegas ON vinos.bodega = bodegas.idbodegas LIMIT 6`;
    connection.query(sql, (error, result)=> {
        if (error) throw error;
        res.send(result)
    })
})

app.get('/varietal', (req, res) => {
    const sql = `SELECT * FROM varietal`;
    connection.query(sql, (error, result)=> {
        if (error) throw error;
        res.send(result)
    })
})


app.get('/bodega', (req, res) => {
    const sql = `SELECT * FROM bodega`;
    connection.query(sql, (error, result)=> {
        if (error) throw error;
        res.send(result)
    })
})


app.get('/categoria', (req, res) => {
    const sql = `SELECT * FROM categoria`;
    connection.query(sql, (error, result)=> {
        if (error) throw error;
        res.send(result)
    })
})

app.get('/vino', (req, res) => {
    res.send("HOLA MUNDO")
})


app.get('/filter', (req, res) => {
    let firstFilter;
    let secondFilter;
    let thirdFilter;
    let sql;
    let limite;
    
    firstFilter = req.query.bodega !== "" ? `CodBodega = '${req.query.bodega}'` : "";
    secondFilter = req.query.categoria ? `CodCategoria = '${req.query.categoria}'` : "";
    thirdFilter = req.query.precio ? `ORDER BY PrecioCaja ${req.query.precio}` : "";
    fourFilter = req.query.varietal ? `CodVarietal = '${req.query.varietal}'` : "";
    limite = req.query.pag ? ` LIMIT ${req.query.pag}, 12` : ` LIMIT 0, 12`;


    sql = `SELECT idVinos, NombreProducto, PrecioCaja, CodFoto, NombreBodega, NombreCategoria, NombreVarietal 
    FROM productos 
    INNER JOIN bodega 
    ON productos.CodBodega = bodega.idBodega 
    INNER JOIN categoria
    ON productos.CodCategoria = categoria.idCategoria
    INNER JOIN varietal
    ON productos.CodVarietal = varietal.idVarietal`

    
    if (req.query.bodega != "" || req.query.categoria != "" ||  req.query.varietal != "" ) {    

        if (req.query.bodega && req.query.categoria && req.query.varietal) {
            sql += ` WHERE ${firstFilter} AND ${secondFilter} AND ${fourFilter}`
        } else if (req.query.bodega && req.query.categoria) {
            sql += ` WHERE ${firstFilter} AND ${secondFilter}`
        } else if (req.query.bodega && req.query.varietal){
            sql += ` WHERE ${firstFilter} AND ${fourFilter}`
        } else if (req.query.categoria && req.query.varietal){
            sql += ` WHERE ${secondFilter} AND ${fourFilter}`
        } else if (req.query.bodega){
            sql += ` WHERE ${firstFilter}`
        } else if (req.query.categoria){
            sql += ` WHERE ${secondFilter}`
        } else if (req.query.varietal){
            sql += ` WHERE ${fourFilter}`
        }



}
if (req.query.precio){
    sql += ` ${thirdFilter}`
}
    sql += limite

    
connection.query(sql, (error, result)=> {
    if (error) throw error;
    res.send(result)
})
})



app.get('/counter', (req, res) => {
    let firstFilter;
    let secondFilter;
    let thirdFilter;
    let sql;

    
    firstFilter = req.query.bodega ? `CodBodega = '${req.query.bodega}'` : "";
    secondFilter = req.query.categoria ? `CodCategoria = '${req.query.categoria}'` : "";


    sql = `SELECT idVinos 
    FROM productos 
    INNER JOIN bodega 
    ON productos.CodBodega = bodega.idBodega 
    INNER JOIN categoria
    ON productos.CodCategoria = categoria.idCategoria`
    
    if (req.query.bodega != "" || req.query.categoria != "") {    

        if (req.query.bodega && req.query.categoria) {
            sql += ` WHERE ${firstFilter} AND ${secondFilter}`
        } else if (req.query.bodega) {
            sql += ` WHERE ${firstFilter}`
        } else if (req.query.categoria){
            sql += ` WHERE ${secondFilter}`
        }

}

    
connection.query(sql, (error, result)=> {
    if (error) throw error;
    res.send(result)
})
})







app.listen(port, () => console.log(`Example app listening on port port!`))