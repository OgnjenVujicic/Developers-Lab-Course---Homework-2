var nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
require('dotenv').config();


var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'word2pdfconverter@hotmail.com',
    pass: process.env.MAIL_PASSWORD
  }
});

function sendFileToMail(email, file){

var mailOptions = {
  from: 'word2pdfconverter@hotmail.com',
  to: email,
  subject: 'Product uploaded',
  text: 'New products. Take a look at attachemets.',
  attachments: [
    {   // filename and content type is derived from path
      path: file
    }
  ]
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}

module.exports = sendFileToMail;