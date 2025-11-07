const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const GMAIL_ID = process.env.GMAIL_ID;
const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth = new google.auth.OAuth2(GMAIL_ID, GMAIL_PASSWORD, REDIRECT_URI);
oAuth.setCredentials({ refresh_token: REFRESH_TOKEN });

// console.log("📧 Sending to:", GMAIL_ADDRESS)

async function sendMail(name, email, subject, message) {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_ADDRESS,
        clientId: GMAIL_ID,
        clientSecret: GMAIL_PASSWORD,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `${name} <${email}>`,
      to: GMAIL_ADDRESS,
      subject: `Portfolio Contact: ${subject}`,
      text: message,
      html: `
        <h3>New message from your Portfolio Website</h3>
        <hr /> <br />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br />
        <p>${message}</p>
        `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.error("Mail sending error: ", err);
    throw new Error("Error sending email");
  }
}

module.exports = sendMail;
