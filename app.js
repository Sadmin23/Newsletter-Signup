const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req, res){

    var firstName = req.body.First_Name;
    var lastName = req.body.Last_Name;
    var email = req.body.Email;

    console.log(req.body.First_Name);
    console.log(req.body.Last_Name);
    console.log(req.body.Email);
})

app.listen(3000, function(){
    console.log("Server set at port 3000");
});