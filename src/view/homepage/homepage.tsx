import getdata from "../../component/gitapi/getdata"
import logout from "../../component/gitapi/logout"
import gettoken from "../../component/gitapi/gettoken"
const homepage = () => {
  gettoken();
  return (
    <Card sx={{mt:8,width:500,mx:'auto',boxShadow:4}}>
      
    </Card>
    <div>
      <div>login succes!</div>
      <button onClick={getdata}>getuser</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}
export default homepage
