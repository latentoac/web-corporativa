// netlify/functions/callback.js
exports.handler = async (event) => {
  const { code } = event.queryStringParameters;
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

  if (!code) {
    return { statusCode: 400, body: "Missing code parameter" };
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
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
    });

    const data = await response.json();

    if (data.access_token) {
      const content = JSON.stringify({
        token: data.access_token,
        provider: "github",
      });

      return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: `<!doctype html>
<html>
<head><title>Autenticando...</title></head>
<body>
<script>
  (function() {
    window.opener.postMessage(
      'authorization:github:success:${content}',
      window.location.origin
    );
    window.close();
  })();
<\/script>
</body>
</html>`,
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: `<!doctype html><html><body><script>
  window.opener.postMessage('authorization:github:error:{"message":"Token error"}', window.location.origin);
  window.close();
<\/script></body></html>`,
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: `Error: ${err.message}`,
    };
  }
};
