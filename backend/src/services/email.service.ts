import { transport } from "../config/nodemailer";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "../utils/emailTemplates";

export async function sendPasswordResetEmail(
  email: string,
  verificationOtp: string
) {
  return await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{verificationCode}",
      verificationOtp
    ),
  });
}

export async function sendEmail(email: string, subject: string, html: string) {
  return await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html,
  });
}

export async function sendReminder(
  email: string,
  subject: string,
  html: string
) {
  try {
    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html,
    });
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
