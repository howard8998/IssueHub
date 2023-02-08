import './loginpage.css'
import Button from '@material-ui/core/Button'

function hello() {
  return (
    <>
      <div>
        <>開始登入</>
      </div>
      <Button onClick={Redirect}>login</Button>
    </>
  )
}
function Redirect() {
  window.location.replace(
    'https://github.com/login/oauth/authorize?client_id=b5612b53764b716cbe01',
  )
}
export default hello
