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

module.exports = function(req,res,next){
    try{
        const {username,password} = req.headers
        if(!username || !password){
            return res.status(401).send("fail")
        }
        connection.query('SELECT * FROM user WHERE username = (?) AND password = (?)', [username,password], function(err,result){ 
            if(result.length <= 0){
                res.status(401).send("fail")
                console.log("login fail")
            }else{
                console.log(result.length)
                console.log(result)
                next()
                console.log("success login")
            }
        })
    }catch(err){
        console.log(err)
    }

}