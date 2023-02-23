import axios from 'axios'
async function getAccessToken(
  clientId: string,
  clientSecret: string,
  code: string,
): Promise<string | undefined> {
  try {
    const response = await axios.post(
    'https://localhost:3000/github/oauth/access_token',
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
