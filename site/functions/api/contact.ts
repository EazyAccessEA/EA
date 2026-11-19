interface Env {
  TURNSTILE_SECRET_KEY: string;
}

interface ContactBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
  "cf-turnstile-response": string;
  company_url?: string; // honeypot
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body: ContactBody = await context.request.json();

    // Honeypot — if filled, silently succeed
    if (body.company_url) {
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    // Validate required fields
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    const subject = body.subject?.trim() || "";
    const turnstileToken = body["cf-turnstile-response"];

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Please fill in all required fields." }),
        { status: 400, headers }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Please enter a valid email address." }),
        { status: 400, headers }
      );
    }

    if (message.length < 10) {
      return new Response(
        JSON.stringify({ success: false, error: "Please write a longer message." }),
        { status: 400, headers }
      );
    }

    if (message.length > 5000) {
      return new Response(
        JSON.stringify({ success: false, error: "Message is too long (5000 character limit)." }),
        { status: 400, headers }
      );
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ success: false, error: "Please complete the security check." }),
        { status: 400, headers }
      );
    }

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: context.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: context.request.headers.get("CF-Connecting-IP") || "",
        }),
      }
    );

    const verifyResult: { success: boolean } = await verifyResponse.json();

    if (!verifyResult.success) {
      return new Response(
        JSON.stringify({ success: false, error: "Security check failed. Please try again." }),
        { status: 400, headers }
      );
    }

    // Submission verified — log it (replace with email service in production)
    // e.g. send via Resend, SendGrid, Mailchannels (free on CF Workers), or webhook
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message: message.substring(0, 200),
      timestamp: new Date().toISOString(),
      ip: context.request.headers.get("CF-Connecting-IP"),
    });

    return new Response(JSON.stringify({ success: true }), { headers });
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Something went wrong. Please try again." }),
      { status: 500, headers }
    );
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
