const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

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

router.post('/',(req, res, next) =>{  
    var cnt = "SELECT count(*) as total FROM user"
    var query = connection.query(cnt,function(err,result){
        if(err){
            console.log(err)
        }else{
            if(result[0].total > 0){
                auth(req,res,next)
                console.log(result)
                console.log("Total Records:- " + result[0].total);
            }else{
                next()
                console.log(result)
                console.log("Total Recordsn:- " + result[0].total);
            }
        }
        
    })
},(req,res)=>{
    if(req.body.username!=null && req.body.password!=null){
        // var isi = [req.body.username, req.body.password]
        const {username,password} = req.body
        console.log(username + "dan "+password)
        // console.log(req.body.catatan)
        var content = "INSERT INTO user (username,password) VALUES (?,?)"
        connection.query(content,[username,password], function (err, result) {
            if (err) {
                res.send(500)
                // throw err
                return
            }
        });
        // console.log('sudah terhandle oleh post di /user')
        // console.log(req.body)
        res.end()
    }else{
        res.end()
    }
    
})

router.get('/',auth,(req,res)=>{
    connection.connect(function(err) {
        connection.query("SELECT * FROM user", function (err, result, fields) {
            if (err) throw err;
            res.json(result)
        });
    });
})

router.delete('/:id',auth,(req,res)=>{
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

module.exports = router