var mongo=require('mongodb');
var express=require('express');
var expapp=express();
var myDB;
var req;
var res;
//var accessCount=0;
function testconnect(err, client)
{
    
if (err){
    //console.error(err.name);
   // console.error(err.stack);
   console.error("Unable to connect to database..");
}else{
    console.log("Connected to db.....");
    console.log("Client info : " +client);
}

myDB=client.db('employee');
}
//retryWrites. works in a loop until the data modification is successful.
//w - Write. w=majority. It has to perform bulk writing/bulk modification
mongo.MongoClient.connect
('mongodb://localhost:27017/employee?retryWrites=true&w=majority', testconnect);

function querryresult(err, result)
{
    var h='<html><body>';
    //console.log('----------' + result.length);

    for(i=0;i<result.length;i++)
    {
        h += '<b>First Name </b>' + result[i].First_name + '<BR>';
        h += '<b>Project Name </b>' + result[i].project_name + '<br><br>';
        //console.log(doc.First_Name + ', ' + doc.Project_Name);

    }
     h += '</body></html>';
    res.send(h);
}
function getEmployees(request, response){
    //if accescount is already created in session,it will increment value of acc




    const cursor=myDB.collection('empinfo').find();
    //response.send(cursor);
    //console.log(cursor);
       req=request;
       res=response;
    cursor.toArray(querryresult);
}

function getEmployee(request, response)
    {
       var rexp=new RegExp(request.params.projectname);
    
        const cursor=myDB.collection('empinfo').find(rexp);
        req=request;
        res=response;
        cursor.toArray(querryresult);
    }
    function insertEmployee(request, response){
        var jsobj={"First_name" : request.params.empname, "project_name" : request.params.projectname,
            "Start_Date" : request.params.startdate};
        const cursor=myDB.collection('empinfo').insert(jsobj);
            console.log('inserted ' + jsobj + '  document...');
            var msg='<html><body><b>Insertion succesfull</b></body></html>';
            response.send(msg);
    }

function updateEmployee(request,response){
resu
const cursor=myDB.collection('empinfo').update({"First_name":request.params.firstname},{"project_name":request.params.projectname});
console.log("deleted"+request.params.firstname+"succesfully");
var msg1='<html><body><b>Updation succesfull</b></body></html>';
            response.send(msg1);

}
function insertemployee(request,response){
    const cursor=myDB.collection('empinfo').insertOne({"First_name":request.params.empname},{"project_name":request.params.projectname});
    response.send("Inserted "+request.params.empname+" details successfully");
}

//expapp.use(session(sessioncookie));

//const sessioncookie={name:'cookie1',keys:['3306','localhost',cookie:{secure:true, httpOnly:true, domain:"localhost.com"]}



//Handling Read operation of CRUD

expapp.get('/', getEmployees);
expapp.get('/getEmployee/:projectname', getEmployee);
expapp.get('/insertEmployee/:empname/:projectname', insertemployee);
expapp.get('/updateEmployee/:firstname/:projectname', updateEmployee);
expapp.listen(8081);


  


/*const mysqlconn=mysql.createConnection({host:'localhost',user:'root',password:'Puppy@123',database:'mysql'});
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
        ('select * from employee where empid=?',[request.params.empid],printEmployees);
    
}

function getFewEmployee(request, response) //Call back function
{
    req=request;
    res=response;
    mysqlconn.query
    ('select * from employee where empid > ?  and empid < ? ' ,[request.params.empid1,request.params.empid2],printEmployees);
    //mysqlconn.query(qry, printEmployees); //Static SQL
}

function errorCheck(err)
{
    if(err)
    console.log("there is error in procedure call");
    else
    console.log("succesfully parsed");
}

function updateEmployee(request,response)
{
    req=request;
    res=response;

    mysqlconn.query('CALL UpdEmployee(?,?)',[request.params.empid,request.params.mobno],errorCheck);
 response.send("<html><body><b>Updated peww</b></body></html>");   
}



expapp.get('/',getAllEmployee);
expapp.get('/:empid',getmployee);
expapp.get('/:empid1/:empid2', getFewEmployee);
expapp.get('/UpdateEmployee/:empid/:mobno', updateEmployee);
expapp.listen(8081);
console.log('Server started @ port 8081');*/