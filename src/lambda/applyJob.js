// To change the default recipient, set REACT_APP_APPLICATION_EMAIL in your Netlify environment variables.

if (process.env.NODE_ENV == 'development') require('dotenv').config();

const nodemailer = require('nodemailer');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
};

let transporter = nodemailer.createTransport({
  host: 'mx.aplitrak.com',
  port: 25,
  secure: false,
  logger: true,
  debug: false,
  connectionTimeout: 1000 * 5,
  tls: { rejectUnauthorized: false }
});

exports.handler = async (event, context, callback) => {
  try {
    console.log('\n\n'); 
    console.log('--------------');
    console.log("Client IP ->", event.headers["client-ip"]);
    console.log("Content length ->", event.headers["content-length"]);

    const form = JSON.parse(event.body);
    console.log("FROM >> ", form.candidate_email);

    let mailOptions = {
      from: form.candidate_email,
      to: form.application_email,
      subject: `New Job Application from ${form.candidate_name}`,
      cc: 'admin@andersonhoare.co.uk', // Add your admin/HR email here
      replyTo: `${form.candidate_name} <${form.candidate_email}>`,
      attachments: [
        {
          filename: form.candidate_name + ' cv.' + form.file.type,
          path: form.file.file
        }
      ],
      text: `Job Application Details\n\nName: ${form.candidate_name}\nEmail: ${form.candidate_email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}\n\n---\nThis application was submitted via the Anderson Hoare job application form.`
    };

    const email = await transporter.sendMail(mailOptions);
    console.log(email)
    return {
      headers,
      statusCode: 200,
      body: 'Email sent! >> ' + JSON.stringify(email)
    };
  } catch (error) {
    let msg = 'ERROR >> ' + error.message;
    console.log(msg)
    return {
      headers,
      statusCode: 500,
      body: msg
    };
  }
};
