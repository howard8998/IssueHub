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
  //設置自訂proxy伺服器，如無法作用請自行修改
  const proxyurl = 'https://nameless-morning-7203.howardwang8998.workers.dev/?'
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_PROXY||`${proxyurl}https://github.com`,
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
        await getAccessToken(clientId, clientSecret, code)

      }
    }
  } catch {
    console.error('An error occurred:', Error)
  }
}
export default gettoken
