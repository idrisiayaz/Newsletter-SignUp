const express =  require("express");
const bodyParser =  require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/" , function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/" , function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME : fname,
                    LNAME : lname,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://************************************";

    const options = {
        method: "post", 
        auth : "id**************************************"

    }

    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })       
    });

    request.write(jsonData);
    request.end();

});

let port = process.env.PORT;
if(port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("Server is running on port 3000");
})

