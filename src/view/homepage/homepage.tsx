import axios from 'axios'
import getAccessToken from './gettoken'
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
  const code = getcode()[1]
  const accessToken = await getAccessToken(clientId, clientSecret, code)
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
const getcode = () => {
  return window.location.search.split('?code=')
}
const homepage = () => {
  return (
    <div>
      <div>login susecce!</div>
      <button onClick={getdata}>getuser</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}

const logout = () => {
  window.location.replace('https://github.com/logout')
}

export default homepage
