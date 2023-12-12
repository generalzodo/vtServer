/**
 * Created by Somto on 29/06/2018.
 */
require('dotenv').config()
// var request = require('request');
// var Jusibe = require('jusibe');
const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

// Read the HTML template file
async function readHTMLTemplate(path) {
    try {
        return await readFileAsync(path, 'utf8');
    } catch (error) {
        throw new Error(`Error reading HTML template: ${error.message}`);
    }
}

// Main function to send the email

exports.new =  async function (email, link) {
    // Create a Nodemailer transporter using Mailgun
    const transporter = nodemailer.createTransport(mailgunTransport({
        auth: {
            api_key: 'key-01c7fc84f6ea931e434cfc537630dd34',
            domain: 'citizensraffle.org'
        },
    }));

    // Read the HTML template
    const htmlTemplate = await readHTMLTemplate('./templates/verify/verify-email.html');

    // Replace placeholders in the template
    const personalizedTemplate = htmlTemplate.replace('{{link}}', 'link');

    // Define email options
    const mailOptions = {
        from: 'info@victoriatravels.org',
        to: email,
        subject: 'Confirm your email address - Victoria Travels',
        html: personalizedTemplate,
    };
    console.log(email);

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(`Error sending email: ${error.message}`);
        }
        console.log(`Email sent: ${info.response}`);
    });
}

// Call the function to send the email
