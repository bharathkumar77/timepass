var mysql=require('mysql');
var express=require('express');
var session=require('cookie-session');
var expapp=express();
var expdate=new Date(Date.now()+3*60*1000);
var sesscookie={name:'cookie1',keys:['3306','localhost'],
cookie:{secure:true,httpOnly:true,domain:'localhost.com',expires:expdate}};


expapp.use(session(sesscookie));





const mysqlconn=mysql.createConnection({host:'localhost',user:'root',password:'BHARath@@86',database:'local'});
function testconn(err){
    if(err)
    console.log('Connection not ready error ');
    else
    console.log('Connected succesfully ');

}
var req;
var res;
mysqlconn.connect(testconn);
function printEmployees(err,rows){
    res.cookie(sesscookie);
    res.send(rows);


}

function getAllEmployee(request,response)
{
    req=request;
    res=response;
    mysqlconn.query
('select * from employee',printEmployees);
}
function getmployee(request,response)
{
    req=request;
    res=response;
        mysqlconn.query
        ('select * from employee where empid='+request.params.empid,printEmployees);
    
}

function getFewEmployee(request, response) //Call back function
{
    req=request;
    res=response;
    qry='select * from employee where empid > ' + request.params.empid1 + ' and empid < ' + 
        request.params.empid2;
    mysqlconn.query(qry, printEmployees); //Static SQL
}



expapp.get('/',getAllEmployee);
expapp.get('/:empid',getmployee);
expapp.get('/:empid1/:empid2', getFewEmployee);
expapp.listen(8081);
console.log('Server started @ port 8081');