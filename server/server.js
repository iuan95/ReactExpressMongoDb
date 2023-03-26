const express = require('express');
const { connectToDb, getDb} = require('./db/data')
const axios = require('axios')
const it = require("node:test");
const app = express();
app.use(express.json())
    .use(express.urlencoded({extended:false}))

let db;
connectToDb((err)=>{
    if (!err){
        app.listen(3002, ()=>{
            console.log("app listen on port 3002")
        })
        db = getDb()
    }
})
app.get('/', (req, res)=>{
    res.status(200).send("Главное")
})

app.get('/posts', (req, res)=>{
    let items;
    db.collection('allposts')
        .find()
        .sort({ name: 1})
        .forEach(item => items.push(item))
        .then(()=>{
            res.status(200).json(items)
            console.log(items)
        })
        .catch(()=>{
            res.status(500).json({error: "abasa net"})
        })

})