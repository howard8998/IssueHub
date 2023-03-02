import axios from 'axios'

interface User {
  issues: {
    nodes: Issue[]
  }
}
interface GraphQLResponse {
  data: {
    user: User
  }
}
interface Issue {
  title: string
  url: string
  createdAt: string
  updatedAt: string
  body: string
  repository: {
    nameWithOwner: string
    url: string
  }
}
async function getissue(
  accessToken: string,
  username: string,
): Promise<Issue[] | undefined> {
  const query = `
    query ($username: String!) {
      user(login: $username) {
        issues(first: 10, states: [OPEN], orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            title
            url
            createdAt
            updatedAt
            body
            repository {
              nameWithOwner
              url
            }
          }
        }
      }
    }
    `

  try {
    const response = await axios.post<GraphQLResponse>(
      'https://api.github.com/graphql',
      {
        query,
        variables: {
          username
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.data.data.user.issues?.nodes 

  } catch (error) {
    console.error(error)
    return undefined
  }
}

const getIssue = async () => {
  if (sessionStorage) {
    const accessToken = sessionStorage.getItem('accessToken')
    const username = sessionStorage.getItem('username')
    if (accessToken&&username) {
          getissue(accessToken,username).then((nodes) => {
            if (nodes) {
              console.log(nodes[0].title)
            } else {
              console.log('User not found')
            }
          })
        } else {
          console.log('User not found')
        }
      }
    }


export default getIssue
