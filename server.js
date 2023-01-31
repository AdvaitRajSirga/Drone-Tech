const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const nodemailer = require('nodemailer');
const { stringify } = require("querystring");
const path = require('path');

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
  });

  app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true}));
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  app.post('/send', (req, res) => {
    var subName = req.body.name
    var emailaddress = req.body.email
    var address = req.body.address
    var drones = req.body.drones
    const print = JSON.parse(JSON.stringify(req.body));
    console.log(print);
    res.send("Hello " + subName + ", Thank you for Buying the drones")
  let mailTransporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'sirgaraj2011@outlook.com',
        pass: 'Chessboss@1902'
    }
});

  
let mailDetails = {
    from: 'sirgaraj2011@outlook.com',
    to: 'sirgaraj2011@outlook.com',
    subject: 'Drones',
      text: "Details:" + "\r\n" + 
      "Name: " + subName + "\r\n" +
      "Email: " + emailaddress + "\r\n" +
      "Address: " + address + "\r\n" +
      "drones: " + drones
  }
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});


});
