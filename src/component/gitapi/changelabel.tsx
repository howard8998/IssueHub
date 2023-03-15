import axios, { AxiosRequestConfig } from 'axios'
const changeLabel = async (
  owner: string,
  repo: string,
  issueNumber: number,
  labels: string
) => {
  const accesstoken = sessionStorage.getItem('accessToken')
  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accesstoken}`,
  }
  const label:string[] = [labels]
  // Set the request data
  const data = {
    labels:label,
  }
  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`
  // Send the PUT request to update the issue
  axios
    .patch(url, data, { headers })
    .then((response) => {
      console.log('Issue Label updated successfully!')
    })
    .catch((error) => {
      console.error('Error updating issue:', error)
    })
}
export default changeLabel
