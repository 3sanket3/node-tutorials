const express = require("express");
const nodemailer = require("nodemailer");

//create express app
const app = express();

//port at which the server will run
const port = 4000;

//create end point
app.get("/", (request, response) => {
  //send 'Hi, from Node server' to client
  response.send("Hi, from Node server");
});

//create send email endpoint
app.get("/send-email", async (request, response) => {
  try {
    // create transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "30b7d33f3ac774",
        pass: "d75252e55f53d9"
      }
    });

    const emailData = {
      from: "sender@somecompany.com",
      to: "receiver-two@somecomapny.com",
      subject: "A test email",
      html: "<p> Hi there, this is a test email </p>"
    };

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html
    });

    response.send(`An email successfully sent to ${emailData.to}`);
  } catch (e) {
    console.log(e);
    response.send(`An error occurred while sending email`);
  }
});

//module.exports = app;

//start server and listen for the rewuest
app.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);
