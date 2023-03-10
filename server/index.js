const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = 8000;
const app = express()
const DB = require('./sqlite')

DB.createTable()

// 设置静态目录
app.use('/', express.static(path.resolve(__dirname, '../web/build/')))

// 解析body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.all('*', (req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Content-Type', 'application/json;charset=utf-8')
    req.next()
})

app.get('/api/queryBlogs', async (req,res)=>{
   const result = await new Promise((resolve, reject )=>{
        DB.queryData('select * from blogs', (rows)=>{
            resolve(rows)
        })
    })
    res.send(result)
})

app.post('/api/addBlog', (req, res)=>{
    console.log(req.body);

    if(req.body){
        console.log(req.body);
        const value = Object.keys(req.body).map( i => req.body[i])
        console.log(value)
        DB.insertData('insert into blogs(title, content, parseContent) values(?,?,?)', [value])
        res.send(value)
    }
})

app.listen(PORT, ()=>{
    console.log(`app is running on ${PORT}`)
})