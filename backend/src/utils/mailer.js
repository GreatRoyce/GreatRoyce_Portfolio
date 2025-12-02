const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.GMAIL_ID;
const CLIENT_SECRET = process.env.GMAIL_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oAuth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(name, email, subject, message) {
  try {
    const accessToken = await oAuth.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_ADDRESS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `${name} <${email}>`,
      to: GMAIL_ADDRESS,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New message from your Portfolio Website</h3><hr/><br/>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p><br/>
        <p>${message}</p>
      `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.error("Mail sending error:", err);
    throw new Error("Error sending email");
  }
}

module.exports = sendMail;
