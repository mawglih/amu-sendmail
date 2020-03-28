const express = require('express');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8787;
const transport = {
  pool: true,
  host: 'mail.oleg-dev.com',
  secure: true,
  auth: {
    user: 'alphamarineupholstery@gmail.com',
    pass: 'We@reAlpha1!',
  },
  // port: 465,
  // tls: {
  //   rejectUnauthorized: false
  // },
  crossdomain:true
};
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/send-email', cors(), function (req, res) {
  const transporter = nodeMailer.createTransport(transport);
  let mailOptions = {
    from: req.body.email,
    to: 'mawglih@gmail.com',
    subject: `${req.body.subject} from ${req.body.name}`,
    text: 
    `
    Name: ${req.body.userName}
    Email: ${req.body.userEmail}
    Message: ${req.body.userText}
    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
      res.render('index');
  });
});

app.listen(port, () => console.log(`Server is running at port ${port}`));