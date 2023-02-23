import './loginpage.css'

import Button from '@mui/material/Button';


const login = () => {
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
    'https://github.com/login/oauth/authorize?client_id=b5612b53764b716cbe01;scope=repo,user',
  )
}
export default login
