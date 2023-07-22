// emailService.js
import nodemailer from 'nodemailer';

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-gmail-account@gmail.com', // Replace with your Gmail email address
    pass: 'your-gmail-password' // Replace with your Gmail password or an app password (if you use 2-step verification)
  }
});

// Function to send an email
export const sendEmail = async (to, subject, text, html) => {
  try {
    // Define email options
    const mailOptions = {
      from: 'your-gmail-account@gmail.com', // Replace with your Gmail email address
      to,
      subject,
      text,
      html
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
