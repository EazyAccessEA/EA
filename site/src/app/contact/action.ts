"use server";

export interface ContactFormState {
  success: boolean;
  error?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot check — if this hidden field has a value, it's a bot
  const honeypot = formData.get("company_url");
  if (honeypot) {
    // Silently succeed to not tip off bots
    return { success: true };
  }

  // Extract fields
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const subject = formData.get("subject")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  const turnstileToken = formData.get("cf-turnstile-response")?.toString();

  // Validate required fields
  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Message length check
  if (message.length < 10) {
    return { success: false, error: "Please write a longer message." };
  }

  if (message.length > 5000) {
    return { success: false, error: "Message is too long (5000 character limit)." };
  }

  // Verify Turnstile token
  if (!turnstileToken) {
    return { success: false, error: "Please complete the security check." };
  }

  try {
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      }
    );

    const verifyResult = await verifyResponse.json();

    if (!verifyResult.success) {
      return {
        success: false,
        error: "Security check failed. Please try again.",
      };
    }
  } catch {
    return {
      success: false,
      error: "Could not verify security check. Please try again.",
    };
  }

  // In production, this is where you would send the email
  // (e.g. via Resend, SendGrid, Postmark, or a webhook to Slack/email)
  // For now, log to server console
  console.log("Contact form submission:", {
    name,
    email,
    subject: subject || "(no subject)",
    message,
    timestamp: new Date().toISOString(),
  });

  return { success: true };
}
