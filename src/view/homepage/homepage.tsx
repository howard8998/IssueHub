import getdata from "../../component/gitapi/getdata"
import logout from "../../component/gitapi/logout"
import gettoken from "../../component/gitapi/gettoken"
const homepage = () => {
  gettoken();
  return (
    <div>
      <div>login succes!</div>
      <button onClick={getdata}>getuser</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}
export default homepage
