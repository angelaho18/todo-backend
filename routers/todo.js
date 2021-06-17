const express = require('express')
const router = express.Router()

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

router.get('/',(req,res)=>{
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

router.post('/',(req,res)=>{
    var isi = req.body.catatan
    console.log(req.body.catatan)
    var content = "INSERT INTO daftartodo (catatan) VALUES (?)"
    
    connection.query(content,isi, function (err, result) {
        if (err){
            throw err
        }else{
            var lastID = result.insertId
            // res.json({id: result.insertId, catatan: isi})
            // res.json(result)
            console.log(result.insertId)
            console.log(isi)
            console.log("1 record inserted");
        }
    });
    console.log('sudah terhandle oleh post di /todo')
    console.log(req.body)
    
    res.end()
})

router.delete('/:id',(req,res)=>{
    var content = "DELETE from daftartodo WHERE id = (?)"
    connection.query(content,req.params.id, function (err, result) {
        console.log(req.params.id)
        if (err) throw err;
        console.log("1 record deleted");
    });
    res.end()
})

module.exports = router
