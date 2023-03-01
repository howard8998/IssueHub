import getuser from '../../component/gitapi/getuser'
import logout from '../../component/gitapi/logout'
import gettoken from '../../component/gitapi/gettoken'
import { Card } from '@mui/material'
import getIssue from '../../component/gitapi/getissue'
const homepage = () => {
  gettoken()
  return (
    <Card sx={{ mt: 8, width: 500, mx: 'auto', boxShadow: 4 }}>
      <div>
        <div>login succes!</div>
        <button onClick={getuser}>getuser</button>
        <button onClick={getIssue}>getIssue</button>
        <button onClick={logout}>logout</button>
      </div>
    </Card>
  )
}
export default homepage
