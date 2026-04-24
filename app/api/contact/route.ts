import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const SERVICE_COLORS: Record<string, string> = {
  "Firemní weby": "#CF2F31",
  "Redesign": "#9333EA",
  "Optimalizace": "#3B82F6",
  "Web aplikace": "#F97316",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, service, message, currentUrl } = body;

    if (!email || !service || !message) {
      return NextResponse.json(
        { error: "Chybí povinná pole." },
        { status: 400 }
      );
    }

    const color = SERVICE_COLORS[service] || "#CF2F31";
    const now = new Date().toLocaleString("cs-CZ", {
      timeZone: "Europe/Prague",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#141414;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">
          
          <!-- Header bar -->
          <tr>
            <td style="padding:0;">
              <div style="height:4px;background:linear-gradient(90deg,${color},${color}80,transparent);"></div>
            </td>
          </tr>

          <!-- Logo area -->
          <tr>
            <td style="padding:32px 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">ZF</span>
                    <span style="font-size:12px;color:#666;margin-left:12px;">Portfolio Contact</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:#555;font-family:monospace;">${now}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);"></div>
            </td>
          </tr>

          <!-- Service badge -->
          <tr>
            <td style="padding:28px 40px 8px;">
              <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${color};">Nová poptávka</span>
            </td>
          </tr>

          <!-- Service name -->
          <tr>
            <td style="padding:4px 40px 20px;">
              <span style="display:inline-block;padding:8px 20px;background:${color}15;border:1px solid ${color}30;border-radius:12px;font-size:16px;font-weight:700;color:#ffffff;">
                ${service}
              </span>
            </td>
          </tr>

          <!-- Info grid -->
          <tr>
            <td style="padding:8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border-radius:12px;border:1px solid rgba(255,255,255,0.04);">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <span style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#666;display:block;margin-bottom:4px;">Email klienta</span>
                    <a href="mailto:${email}" style="font-size:14px;color:#ffffff;text-decoration:none;font-weight:500;">${email}</a>
                  </td>
                </tr>
                ${currentUrl ? `
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <span style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#666;display:block;margin-bottom:4px;">Aktuální web</span>
                    <a href="${currentUrl}" style="font-size:14px;color:${color};text-decoration:none;font-weight:500;">${currentUrl}</a>
                  </td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding:16px 20px;">
                    <span style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#666;display:block;margin-bottom:8px;">Zpráva</span>
                    <p style="font-size:14px;color:#ccc;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick action -->
          <tr>
            <td style="padding:24px 40px;">
              <a href="mailto:${email}?subject=Re: ${service} — Zdenek Ferenc" style="display:inline-block;padding:12px 28px;background:#ffffff;color:#000000;font-size:13px;font-weight:700;border-radius:10px;text-decoration:none;">
                Odpovědět →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent);"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 28px;">
              <span style="font-size:11px;color:#444;">Odesláno z portfolia — zdenekferenc.com</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "zdenekk.ferenc@gmail.com",
      replyTo: email,
      subject: `Nová poptávka: ${service}`,
      html: htmlEmail,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Nepodařilo se odeslat zprávu." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Interní chyba serveru." },
      { status: 500 }
    );
  }
}
