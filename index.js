const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set("view engine", "ejs")
app.use(cors())

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "daftar"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("yeee connected !!!")
})

app.get('/',(req,res)=>{
    res.send(
        `<html>
            <form action="/todo" method="POST">
                <label>todo</label>
                <input name = "todo"></input>
                <button>Submit</button>
            </form>
        </html>`
    )
})

app.get('/todo',(req,res)=>{
    connection.connect(function(err) {
        connection.query("SELECT * FROM daftartodo", function (err, result, fields) {
            if (err) throw err;
            // const result1 = Object.values(JSON.parse(JSON.stringify(result)));
            res.json(result)
            //res.json
            // res.render('index',{hasil:result})
        });
    });
})
app.post('/todo',(req,res)=>{
    var isi = req.body.todo
    //req.body.catatan
    console.log(req.body.todo)
    var content = "INSERT INTO daftartodo (catatan) VALUES (?)"
    connection.query(content,isi, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    console.log('sudah terhandle oleh post di /todo')
    console.log(req.body)
    res.end()
})

//hps?

// app.delete('/todo/'(req,res))

app.listen(3000, ()=> console.log(`server started on 3000`))
