const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");
const { request } = require("http");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.post("/",function(req, res){

    const firstName = req.body.First_Name;
    const lastName = req.body.Last_Name;
    const email = req.body.Email;

    var data = {
        members: 
        [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:
                {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/bdd0e0631f"

    const options = {
        method: "POST",
        auth: "Sadmin:ac0c02988c9952b603583212ab670d628-us8"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        } else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.listen(3000, function(){
    console.log("Server set at port 3000");
});

// API key
// c0c02988c9952b603583212ab670d628-us8

// Audience ID
// bdd0e0631f