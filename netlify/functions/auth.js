export const handler = async (event) => {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
  const { code } = event.queryStringParameters;

  // 1. Si no hay código, redirigir a GitHub (Paso de autorización)
  if (!code) {
    const scope = "repo,user";
    const githubAuthUrl = `https://github.com{GITHUB_CLIENT_ID}&scope=${scope}`;
    return {
      statusCode: 302,
      headers: { Location: githubAuthUrl },
    };
  }

  // 2. Intercambio de código por token (Paso de autenticación) de forma nativa
  try {
    const response = await fetch("https://github.com", {
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

    if (data.error) {
      return { statusCode: 401, body: `Error de GitHub: ${data.error_description}` };
    }

    // 3. Comunicación segura con el CMS mediante postMessage
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: `
        <script>
          (function() {
            const token = "${data.access_token}";
            const message = "authorization:github:success:" + JSON.stringify({token: token, provider: "github"});
            // Solo enviamos el mensaje a nuestro propio origen por seguridad
            window.opener.postMessage(message, window.location.origin);
            window.close();
          })();
        </script>
      `,
    };
  } catch (error) {
    return { statusCode: 500, body: "Error interno del servidor" };
  }
};