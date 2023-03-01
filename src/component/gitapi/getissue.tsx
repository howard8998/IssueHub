import axios from 'axios'

interface User {
  login: string
  issues: {
    nodes: Issue[]
  }
}
interface GraphQLResponse {
  data: {
    viewer: User
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
): Promise<Issue | undefined> {
  const query = `
    query ($username: String!) {
      user(login: $username) {
        issues(first: 100, states: [OPEN], orderBy: {field: CREATED_AT, direction: DESC}) {
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
          username,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return response.data.data.viewer.issues.nodes[0]
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
          getissue(accessToken,username).then((issue) => {
            if (issue) {
              console.log(issue.title)
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
