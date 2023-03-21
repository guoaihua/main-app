var fs = require('fs');
var file = `${process.env.DB_FILE_PATH || '/ziming-app/'}blog.db`;//这里写的就是数据库文件的路径
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

// 初始化表
const createTable = function(){
    const sql = db.prepare('create table if not exists blogs(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, content TEXT, parseContent TEXT, labels TEXT, update_time INTEGER)')
    sql.run()
}

const insertData = function(sql, objects){
        db.serialize(function(){
                 var stmt = db.prepare(sql);
                 for(var i = 0; i < objects.length; ++i){
                     stmt.run(objects[i]);
                 }
                 stmt.finalize();
             });
        
}

const queryData = function(sql, callback){
        db.all(sql, function(err, rows){
                if(null != err){
                     db.printErrorInfo(err);
                     return;
                 }
          
                /// deal query data.
                 if(callback){
                     callback(rows);
                 }
             });
}


module.exports = {
    insertData,
    queryData,
    createTable
}