import { Resend } from "resend";
import appConfig from "../common/config";

const resend = new Resend(appConfig.RESEND.apiKey);

export async function sendResetPasswordEmailResend(
  to: string,
  resetLink: string,
) {
  try {
    const result = await resend.emails.send({
      from: "Badminton Store <onboarding@resend.dev>",
      to,
      subject: "Reset your password 🔐",
      html: `
        <div>
          <h2>Badminton Store</h2>
          <p>Click the link below to reset your password:</p>

          <a href="${resetLink}">
            Reset password
          </a>

          <p style="margin-top:10px;color:gray">
            ${resetLink}
          </p>
        </div>
      `,
    });

    console.log("📩 RESEND RESULT:", result);

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result;
  } catch (err) {
    console.error("❌ SEND EMAIL FAILED:", err);
    throw err;
  }
}
