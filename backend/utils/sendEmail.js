const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  // 1) create a transporter
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "infogracebusinessservices@gmail.com",
      pass: "xxdhqrbmayrtbdtu",
    },
  });
  // 2)Define the email options
  const message = {
    from: options.fromemail,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };
  // 3) Actually send the email
  await transporter.sendMail(message);
};
