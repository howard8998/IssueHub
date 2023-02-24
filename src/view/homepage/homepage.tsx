import getdata from '../../component/gitapi/getdata'
import logout from '../../component/gitapi/logout'
import gettoken from '../../component/gitapi/gettoken'
import { Card } from '@mui/material'
const homepage = () => {
  gettoken()
  return (
    <Card sx={{ mt: 8, width: 500, mx: 'auto', boxShadow: 4 }}>
      <div>
        <div>login succes!</div>
        <button onClick={getdata}>getuser</button>
        <button onClick={logout}>logout</button>
      </div>
    </Card>
  )
}
export default homepage
