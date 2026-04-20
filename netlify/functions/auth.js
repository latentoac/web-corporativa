export const handler = async (event) => {
  const { GITHUB_CLIENT_ID } = process.env;
  const scope = "repo,user";
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${scope}`;

  return {
    statusCode: 302,
    headers: { Location: githubAuthUrl },
  };
};
