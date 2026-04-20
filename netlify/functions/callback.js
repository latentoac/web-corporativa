exports.handler = async (event) => {
  const { code, state } = event.queryStringParameters || {};
  const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    SITE_URL,
  } = process.env;

  if (!code) {
    return { statusCode: 400, body: "Missing 'code' parameter" };
  }

  // State opcional — Decap CMS no lo envía por defecto
  if (state) {
    console.log("State recibido:", state);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const githubResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    const data = await githubResponse.json();

    if (data.error) {
      return {
        statusCode: 401,
        body: `GitHub OAuth error: ${data.error_description || data.error}`,
      };
    }

    if (!data.access_token) {
      return { statusCode: 401, body: "No access token received from GitHub" };
    }

    const payload = {
      token: data.access_token,
      provider: "github",
    };

    const safePayload = JSON.stringify(payload)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");

    const origin = SITE_URL || "*";

    const html = `<!doctype html>
<html>
<head><title>Autenticando...</title></head>
<body>
<script>
  (function () {
    var payload = ${safePayload};
    var message = "authorization:github:success:" + JSON.stringify(payload);
    window.opener.postMessage(message, "${origin}");
    setTimeout(function () { window.close(); }, 1500);
  })();
<\/script>
</body>
</html>`;

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: html,
    };

  } catch (error) {
    const isTimeout = error.name === "AbortError";
    return {
      statusCode: 500,
      body: isTimeout ? "Request to GitHub timed out" : `Server error: ${error.message}`,
    };
  }
};