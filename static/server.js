var express=require("express");
var app=express();
var http=require("http").Server(app);
var io=require("socket.io")(http);
var formidable=require("formidable");
var mysql  = require('mysql');
app.all("*",function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type,Accept,X-Requested-With,Authorization");
    response.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    response.header("X-Powered-By",'3.2.1');
    response.header("Content-Type","application/json;charset=utf-8");
    next();
});
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zht123',
    port: '3306',
    database: 'fastadmin'
});
var person=io.of("/person");
var team=io.of("/team");
var referee=io.of("/referee");
var member=io.of("/member");
person.on("connection",function (socket) {
    socket.on("form",function (d) {
        connection.connect();
        var sql = 'insert into fa_person(name,sex,prov,city,country,address,idcard,birthday,phone,password) value(?,?,?,?,?,?,?,?,?,?)';
        var params=[d.username,d.sex,d.prov,d.city,d.country,d.address,d.idcard,d.birthday,d.phone,d.password];
        connection.query(sql,params,function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        });
        connection.end();
    });
});
team.on("connection",function (socket) {
    socket.on("form",function (d) {
        connection.connect();
        console.log(d.birthday);
        var sql = 'insert into fa_team(name,sex,prov,city,country,address,idcard,grade,photo) value(?,?,?,?,?,?)';
        var params=[d.username,d.sex,d.prov,d.city,d.country,d.address,d.idcard,d.grade,d.photo];
        connection.query(sql,params,function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        });
        connection.end();
    });
});
referee.on("connection",function (socket) {
    socket.on("form",function (d) {
        connection.connect();
        console.log(d.birthday);
        var sql = 'insert into fa_team(tname,name,prov,city,country,address,idcard,phone) value(?,?,?,?,?,?,?,?)';
        var params=[d.tname,d.username,d.prov,d.city,d.country,d.address,d.idcard,d.phone];
        connection.query(sql,params,function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        });
        connection.end();
    });
});
member.on("connection",function (socket) {
    socket.on("message",function (d) {
        connection.connect();
        var sql = 'select * from fa_member';
        connection.query(sql,function (err, result) {
            var m;
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            for (var i=0;i<result.length;i++){
                if (d.username===result[i].name&&d.password===result[i].password){
                   m="登录成功";
                } else if (d.username!==result[i].name||d.password===result[i].password){
                    m="用户名不正确";
                } else if (d.username===result[i].name||d.password!==result[i].password){
                    m="密码不正确";
                } else{
                    m="登录失败";
                }
            }
            member.sockets[socket.id].emit("success",m);
        });
        connection.end();
    });
});
http.listen(3001,function () {
    console.log("服务启动成功");
});
