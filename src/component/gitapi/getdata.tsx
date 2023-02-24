import axios from 'axios'
import { access } from 'fs'
import getAccessToken from './gettoken'
const clientId: string = process.env.REACT_APP_CLIENTID as string
const clientSecret: string = process.env.REACT_APP_CLIENTSECRET as string
interface User {
  login: string
  name: string
  email: string
}
interface GraphQLResponse {
  data: {
    viewer: User
  }
}

async function getUser(accessToken: string): Promise<User | undefined> {
  const query = `
    query {
      viewer {
        login
        name
        email
      }
    }
  `

  try {
    const response = await axios.post<GraphQLResponse>(
      'https://api.github.com/graphql',
      { query },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { login, name, email } = response.data.data.viewer
    return { login, name, email }
  } catch (error) {
    console.error(error)
    return undefined
  }
}
const getdata = async () => {
  if (sessionStorage) {
    const accessToken = sessionStorage.getItem('accessToken')
    if (accessToken) {
      getUser(accessToken).then((user) => {
        if (user) {
          console.log(`Username: ${user.login}`)
          console.log(`Name: ${user.name}`)
          console.log(`Email: ${user.email}`)
        } else {
          console.log('User not found')
        }
      })
    }
  }
}

export default getdata
