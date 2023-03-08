import axios, { AxiosRequestConfig } from 'axios'

const token = sessionStorage.getItem('accessToken')

const EditIssue = (
  owner: string,
  repo: string,
  issueNumber: number,
  newTitle: string,
  newBody: string,
) => {
  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  // Set the request data
  const data = {
    title: newTitle,
    body: newBody,
  }
  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`
  // Send the PUT request to update the issue
  axios
    .put(url, data, { headers })
    .then((response) => {
      console.log('Issue updated successfully!')
    })
    .catch((error) => {
      console.error('Error updating issue:', error)
    })
}
export default EditIssue
