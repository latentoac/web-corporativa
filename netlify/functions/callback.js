export const handler = async (event) => {
  const { code } = event.queryStringParameters;
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    // Inyecta el token en una ventana popup que Decap CMS escucha
    const script = `
      <script>
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: "github" })}',
          '*'
        );
      </script>
    `;
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: script,
    };
  }

  return { statusCode: 401, body: "OAuth error" };
};
