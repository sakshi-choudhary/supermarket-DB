const express=require('express')
const app=express()
const mysql=require('mysql')
const bodyParser=require('body-parser')
require('dotenv').config()

const db=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password: process.env.DB_PASS,
    database:"supermarket_db",
})

app.use(bodyParser.urlencoded({extended:true}))

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json())

app.post('/api/insert',(req,res)=>{
    const sqlInsert = "INSERT INTO stock (item_name,qt,item_price,total_price,status) VALUES (?,?,?,?,?);"
        db.query(sqlInsert,[req.body.item_name,req.body.qt,req.body.item_price,req.body.total_price,req.body.status],(err,result)=>{
        if(err) console.log(err)
        else console.log('ADDED TO DB ✅',result)
        res.send('Hello Server!!')
    })
})

app.get('/api/get',(req,res)=>{
const sqlSelect = "SELECT * FROM stock;"
    db.query(sqlSelect,(err,result)=>{
        console.log(err)
        res.send(result)
    })
})

app.delete('/api/del/:item_name',(req,res)=>{
    const sqlDel = "DELETE from stock WHERE item_name = ?"
        db.query(sqlDel,req.params.item_name,(err,result)=>{
        if(err) console.log(err)
        else console.log('DELETED from DB ✅',result)
    })
})

app.put('/api/edit/:item_name',(req,res)=>{
    const sqlEdit = "UPDATE stock SET item_name=?,qt=?,item_price=?,total_price=?,status=? WHERE item_name = ?"
        db.query(sqlEdit,[req.body.item_name,req.body.qt,req.body.item_price,req.body.total_price,req.body.status,req.params.item_name],(err,result)=>{
        if(err) console.log(err)
        else console.log('EDITED in DB ✅',result)
    })
})

app.listen(5001,()=>{
    console.log('running on 5001!!!')
})