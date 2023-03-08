const express = require('express')
const path = require('path')
const PORT = 8000;
const app = express()

// 设置静态目录
app.use('/', express.static(path.resolve(__dirname, '../web/build/')))

app.listen(PORT, ()=>{
    console.log(`app is running on ${PORT}`)
})