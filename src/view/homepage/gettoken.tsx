import axios from "axios"
async function getAccessToken(
    clientId: string,
    clientSecret: string,
    code: string,
  ): Promise<string | undefined> {
    try {
      const response = await axios.post(
        'http://github.com/login/oauth/access_token',
        
        {
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
        },
        {
          withCredentials: true,
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
  
export default getAccessToken;