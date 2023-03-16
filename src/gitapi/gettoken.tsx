import axios from 'axios'
const clientId: string = process.env.REACT_APP_CLIENTID as string
const clientSecret: string = process.env.REACT_APP_CLIENTSECRET as string
const getcode = () => {
  return window.location.search.split('?code=')
}
async function getAccessToken(
  clientId: string,
  clientSecret: string,
  code: string,
): Promise<string | undefined> {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_PROXY,
  })
  try {
    const response = await instance.post(
      '/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    )
    const accessToken = response.data.access_token
    sessionStorage.setItem('accessToken', accessToken)
    console.log('gettoken success')
    return accessToken
  } catch (error) {
    console.error(error)
    return undefined
  }
}
const gettoken = async () => {
  try {
    const code = await getcode()[1]
    if (
      sessionStorage.getItem('accessToken') === undefined ||
      sessionStorage.getItem('accessToken') === null
    ) {
      if (window.location.search.match('code=?')) {
        console.log(clientSecret)
        await getAccessToken(clientId, clientSecret, code)

      }
    }
  } catch {
    console.error('An error occurred:', Error)
  }
}
export default gettoken
