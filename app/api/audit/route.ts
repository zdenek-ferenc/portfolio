import { Resend } from "resend";
import { NextResponse } from "next/server";

const ACCENT = "#CF2F31";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const rawUrl = typeof body.url === "string" ? body.url.trim() : "";

    if (!email || !rawUrl) {
      return NextResponse.json({ error: "Chybí povinná pole." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Neplatný e-mail." }, { status: 400 });
    }

    // Klient často napíše jen "mojefirma.cz", odkaz v mailu ale potřebuje protokol
    const href = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
    let domain: string;
    try {
      domain = new URL(href).hostname.replace(/^www\./i, "");
    } catch {
      return NextResponse.json({ error: "Neplatná adresa webu." }, { status: 400 });
    }

    const safeEmail = escapeHtml(email);
    const safeHref = escapeHtml(href);
    const safeDomain = escapeHtml(domain);

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

          <tr>
            <td style="padding:0;">
              <div style="height:4px;background:linear-gradient(90deg,${ACCENT},${ACCENT}80,transparent);"></div>
            </td>
          </tr>

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

          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 40px 8px;">
              <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${ACCENT};">Audit zdarma</span>
            </td>
          </tr>

          <tr>
            <td style="padding:4px 40px 20px;">
              <span style="display:inline-block;padding:8px 20px;background:${ACCENT}15;border:1px solid ${ACCENT}30;border-radius:12px;font-size:16px;font-weight:700;color:#ffffff;">
                ${safeDomain}
              </span>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border-radius:12px;border:1px solid rgba(255,255,255,0.04);">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <span style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#666;display:block;margin-bottom:4px;">Email klienta</span>
                    <a href="mailto:${safeEmail}" style="font-size:14px;color:#ffffff;text-decoration:none;font-weight:500;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;">
                    <span style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#666;display:block;margin-bottom:4px;">Web k auditu</span>
                    <a href="${safeHref}" style="font-size:14px;color:${ACCENT};text-decoration:none;font-weight:500;">${safeHref}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 40px;">
              <a href="${safeHref}" style="display:inline-block;padding:12px 28px;background:#ffffff;color:#000000;font-size:13px;font-weight:700;border-radius:10px;text-decoration:none;margin-right:8px;">
                Otevřít web
              </a>
              <a href="https://pagespeed.web.dev/analysis?url=${encodeURIComponent(href)}" style="display:inline-block;padding:12px 28px;background:transparent;color:#ffffff;font-size:13px;font-weight:700;border-radius:10px;text-decoration:none;border:1px solid rgba(255,255,255,0.15);">
                PageSpeed
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent);"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 28px;">
              <span style="font-size:11px;color:#444;">Odesláno z portfolia, zdenekferenc.com</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Klient se vytváří až při odeslání, aby build nevyžadoval RESEND_API_KEY.
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Audit API: chybí RESEND_API_KEY.");
      return NextResponse.json(
        { error: "Odesílání e-mailů není nakonfigurované." },
        { status: 500 }
      );
    }
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "zdenekk.ferenc@gmail.com",
      replyTo: email,
      subject: `Audit zdarma: ${domain}`,
      html: htmlEmail,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Nepodařilo se odeslat žádost." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Audit API error:", err);
    return NextResponse.json({ error: "Interní chyba serveru." }, { status: 500 });
  }
}
