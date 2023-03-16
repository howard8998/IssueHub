import axios from 'axios'
import getuser from './getuser'
interface User {
  issues: {
    nodes: Issue[]
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
  }
  repositories: {
    edges: { node: repo }[]
  }
}
interface repo {
  nameWithOwner: string
  hasIssuesEnabled:boolean
}
interface GraphQLResponse {
  data: {
    user: User
  }
}
interface Issue {
  number: number
  title: string
  url: string
  labels: { nodes: { name: string }[] }
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
  endcourse: String,
): Promise<User | undefined> {
  const query = `
    query ($username: String!, $endcourse: String) {
      user(login: $username) {
        issues(first: 10,after: $endcourse ,states:[OPEN],orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            number
            title
            url
            labels(first: 1) {
              nodes {
                name
              }
            }
            createdAt
            updatedAt
            body
            repository {
              nameWithOwner
              url
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
        repositories(first:100) {
          edges {
            node {
              nameWithOwner
              hasIssuesEnabled
            }
          }
        }
      }
    }
  `

  try {
    let variables: any = { username }
    if (endcourse !== '') {
      variables.endcourse = endcourse
    }
    const response = await axios.post<GraphQLResponse>(
      'https://api.github.com/graphql',
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return response.data.data.user
  } catch (error) {
    console.error(error)
    return undefined
  }
}

const getIssue = async (newEndCursor: string) => {
  await getuser()
  if (sessionStorage) {
    const accessToken = sessionStorage.getItem('accessToken')
    const username = sessionStorage.getItem('username')
    if (accessToken && username) {
      return await getissue(accessToken, username, newEndCursor)
    } else {
      console.log('User not found')
      return undefined
    }
  }
}

export default getIssue
