import getuser from '../../component/gitapi/getuser'
import logout from '../../component/gitapi/logout'
import gettoken from '../../component/gitapi/gettoken'
import { Card } from '@mui/material'
import getIssue from '../../component/gitapi/getissue'
import Button from '@mui/material/Button'
const homepage = () => {
  gettoken()
  getuser()
  return (
    <Card sx={{ mt: 8, width: 800, mx: 'auto', boxShadow: 4 }}>
      <div>
        <div>login succes!</div>
        <Button onClick={getIssue}>getIssue</Button>
        <Button onClick={logout}>logout</Button>
        <Card sx ={{mt:2,width:700,minHeight:100,mx:'auto',mb:2,boxShadow:4}}></Card>
      </div>
    </Card>
  )
}
export default homepage
