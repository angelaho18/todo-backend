const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const todojs = require('./routers/todo.js')
const userjs = require('./routers/user.js')
const auth = require('./middleware/auth.js')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine", "ejs")
app.use(cors())

app.use('/todo',auth,todojs)
app.use('/user',userjs)

app.listen(3000, ()=> console.log(`server started on 3000`))
