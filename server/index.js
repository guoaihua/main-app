const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = 8000;
const app = express()
require('dotenv').config()
const DB = require('./sqlite')

DB.createTable()
// function getClientIp(req) {
//     return (
//       req.headers["x-forwarded-for"] ||
//       req.connection.remoteAddress ||
//       req.socket.remoteAddress ||
//       req.connection.socket.remoteAddress
//     );
//   }

//   app.use((req, res, next) => {
//     console.log("时间", new Date());
//     console.log("访问地址", req.url);
//     console.log("f访问ip", getClientIp(req));
  
//     next()
//   })

// 设置静态目录
app.use('/', express.static(path.resolve(__dirname, '../web/dist/')))

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
    const { pageSize=10, order_type='asc', current=0 } = req.query
   const result = await new Promise((resolve, reject )=>{
        DB.queryData([`select * from blogs order by update_time ${order_type} limit ${pageSize} offset ${current * pageSize}`, 'select * from blogs;'], (rows)=>{
            resolve({
                list: rows[0],
                total: rows[1].length
            })
        })
    })
    res.send(result)
})

app.post('/api/addBlog', (req, res)=>{
    if(req.body){
        const value = Object.keys(req.body).map( i => req.body[i])
        DB.insertData('insert into blogs(title, content, parseContent, labels, update_time) values(?,?,?,?,?)', [value])
        res.send(value)
    }
})

app.listen(PORT, (err)=>{
    console.log(`app is running on ${PORT}`)
})