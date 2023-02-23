import axios from 'axios'
async function getAccessToken(
  clientId: string,
  clientSecret: string,
  code: string,
): Promise<string | undefined> {
  const instance = axios.create({
    baseURL: 'http://localhost:3000' // 將 baseURL 設為 http
  });
  console.log(code);
  try {
    const response = await instance.post(
      '/github/oauth/access_token',
      {
        code: code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    )

    return response.data.access_token
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default getAccessToken
