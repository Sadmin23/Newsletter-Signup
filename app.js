const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req, res){

    const firstName = req.body.First_Name;
    const lastName = req.body.Last_Name;
    const email = req.body.Email;

    // console.log(req.body.First_Name);
    // console.log(req.body.Last_Name);
    // console.log(req.body.Email);

    var data = {
        members: 
        [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:
                [
                    {
                        FNAME: firstName,
                        LNAME: lastName
                    }
                ]  
            }
        ]
    };

    const jsonData = JSON.stringify(data);

})

app.listen(3000, function(){
    console.log("Server set at port 3000");
});

// API key
// c0c02988c9952b603583212ab670d628-us8

// Audience ID
// bdd0e0631f