"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.sendEmail = sendEmail;
exports.sendReminder = sendReminder;
const nodemailer_1 = require("../config/nodemailer");
const emailTemplates_1 = require("../utils/emailTemplates");
async function sendPasswordResetEmail(email, verificationOtp) {
    return await nodemailer_1.transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Your Password",
        html: emailTemplates_1.PASSWORD_RESET_REQUEST_TEMPLATE.replace("{verificationCode}", verificationOtp),
    });
}
async function sendEmail(email, subject, html) {
    return await nodemailer_1.transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html,
    });
}
async function sendReminder(email, subject, html) {
    try {
        await nodemailer_1.transport.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            html,
        });
        console.log(`Email sent to ${email}`);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
//# sourceMappingURL=email.service.js.map