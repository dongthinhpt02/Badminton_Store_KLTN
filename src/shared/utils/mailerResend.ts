import { Resend } from "resend";
import appConfig from "../common/config";

const resend = new Resend(appConfig.RESEND.apiKey);

export async function sendResetPasswordEmailResend(
  to: string,
  resetLink: string,
) {
  await resend.emails.send({
    from: "Badminton Store <onboarding@resend.dev>",
    to,
    subject: "Reset your password",
    html: `
      <h2>Badminton Store</h2>
      <p>Click the link below to reset your password.</p>

      <a href="${resetLink}">
        Reset password
      </a>

      <p>${resetLink}</p>
    `,
  });
}
