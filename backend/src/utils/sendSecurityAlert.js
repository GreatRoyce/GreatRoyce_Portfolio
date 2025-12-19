const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.GMAIL_ID;
const CLIENT_SECRET = process.env.GMAIL_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oAuth = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendSecurityAlert({ ip, userAgent, time }) {
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
      from: `"Portfolio Security" <${GMAIL_ADDRESS}>`,
      to: GMAIL_ADDRESS,
      subject: "⚠️ Admin Account Locked (2 Failed Login Attempts)",
      html: `
        <h3>⚠️ Security Alert</h3>
        <p>Your admin account has been temporarily locked due to multiple failed login attempts.</p>
        <hr />
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>IP Address:</strong> ${ip}</p>
        <p><strong>Device:</strong> ${userAgent}</p>
        <br />
        <p>If this was not you, consider changing your admin password immediately.</p>
      `,
    };

    await transport.sendMail(mailOptions);
  } catch (err) {
    // Obfuscated/internal console message
    console.log("SEC-ALRT#42:", err.code || "UNKNOWN");
    // optional: also save detailed error to a local file you keep private
  }
}

module.exports = sendSecurityAlert;
