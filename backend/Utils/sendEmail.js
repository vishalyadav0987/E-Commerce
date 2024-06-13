const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${options.email}`);
    } catch (error) {
        console.error(`Error sending email to ${options.email}: `, error);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;
