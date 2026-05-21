import { createTransport } from "nodemailer";
import { MAIL_PASS, MAIL_USER } from "../../config/config.service.js";
let transporter = createTransport({
    service: "gmail",
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});
async function sendMail({ to, subject, text, html, attachments }) {
    await transporter.sendMail({
        from: `Route <${MAIL_USER}>`,
        to,
        subject,
        text,
        html,
        attachments
    });
}
export default sendMail;
