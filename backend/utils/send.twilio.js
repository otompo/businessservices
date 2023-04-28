const sgMail = require("@sendgrid/mail");

//send email with sendgrid
exports.sendEmail = async ({ to, body, subject, text }) => {
  sgMail.setApiKey(res.meta.api_key);

  const msg = {
    to,
    from: res.meta.official_email,
    subject,
    text,
    html: `<strong>${body}</strong>`,
  };
  await sgMail
    .send(msg)
    .then((res) => {
      return "email sent successfully";
    })
    .catch((error) => {
      return error.message;
    });
};
