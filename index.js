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

// app.get('/',(req,res)=>{
//     res.send(
//         `<html>
//             <form action="/todo" method="POST">
//                 <label>todo</label>
//                 <input name = "catatan"></input>
//                 <button>Submit</button>
//             </form>
//         </html>`
//     )
// })

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
    var isi = req.body.catatan
    console.log(req.body.catatan)
    var content = "INSERT INTO daftartodo (catatan) VALUES (?)"
    connection.query(content,isi, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    console.log('sudah terhandle oleh post di /todo')
    console.log(req.body)
    res.end()
})

app.delete('/todo/:id',(req,res)=>{
    var content = "DELETE from daftartodo WHERE id = (?)"
    connection.query(content,req.params.id, function (err, result) {
        console.log(req.params.id)
        if (err) throw err;
        console.log("1 record deleted");
    });
    res.end()
})


// app.get('/',(req,res)=>{
//     res.send(
//         `<html>
//             <form action="/user" method="POST">
//                 <label>username</label>
//                 <input name = "username1"></input>
//                 <label>password</label>
//                 <input name = "password1"></input>
//                 <button> Login</button>
//             </form>
//         </html>`
//     )
// })

app.post('/userAuth',(req,res)=>{
    try{
        const {username,password} = req.body
        // console.log(username)
        // console.log(password)
        if(!username || !password){
            return res.status(400).send("fail")
        }
        connection.query('SELECT * FROM user WHERE username = (?) AND password = (?)', [username,password], function(err,result){ 
            if(result.length <= 0){
                console.log(result.length)
                console.log(result)
                res.status(401).send("fail")
                console.log("login fail")
            }else{
                console.log(result.length)
                console.log(result)
                // res.redirect('/todo')
                console.log("success login")
            }
        })
    }catch(err){
        console.log(err)
    }
})


app.post('/user',(req,res)=>{
    var isi = [req.body.username, req.body.password]
    console.log(req.body.catatan)
    var content = "INSERT INTO user (username,password) VALUES (?,?)"
    connection.query(content,isi, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    console.log('sudah terhandle oleh post di /user')
    console.log(req.body)
    res.end()
})

app.get('/user',(req,res)=>{
    connection.connect(function(err) {
        connection.query("SELECT * FROM user", function (err, result, fields) {
            if (err) throw err;
            res.json(result)
        });
    });
})

app.delete('/user/:id',(req,res)=>{
    var content = "DELETE from user WHERE userid = (?)"
    connection.query(content,req.params.id, function (err, result) {
        console.log(req.params.id)
        if (err) 
            throw err;
        else
            console.log("1 record deleted");
    });
    res.end()
})

app.listen(3000, ()=> console.log(`server started on 3000`))
