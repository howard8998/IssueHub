import axios from 'axios'
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
  try {
    if (sessionStorage) {
      const accessToken = sessionStorage.getItem('accessToken')
      if (accessToken) {
        getUser(accessToken).then((user) => {
          if (user) {
            console.log(`Username: ${user.login}`)
            sessionStorage.setItem('username', user.login)
          } else {
            console.log('User not found')
          }
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default getdata
