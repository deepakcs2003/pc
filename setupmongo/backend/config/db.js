const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host:'localhost',
    user:'',
    password:'',
    database:''
});

db.connect((err)=>{
    if(err){
        console.log("Database Connection Falied ", err)
        return;
    }
    else{
        console.log("Database (MySql) Connection Successfull !!")
    }
})

module.exports =db;