import axios, { AxiosRequestConfig } from 'axios'



const PostIssue = async (
  ownerwithrepo: string,
  newTitle: string,
  newBody: string,
) => {
  const accesstoken = sessionStorage.getItem('accessToken')
  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accesstoken}`,
  }

  // Set the request data
  const data = {
    title: newTitle,
    body: newBody,
    labels: ["open"]
  }
  const url = `https://api.github.com/repos/${ownerwithrepo}/issues`
  // Send the PUT request to update the issue
  await axios
    .post(url, data, { headers })
    .then((response) => {
      console.log('Post issue successfully!')
    })
    .catch((error) => {
      console.error('Error updating issue:', error)
      throw new Error('Failed to post issue')
    })
  
}
export default PostIssue
