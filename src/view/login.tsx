import Button from '@mui/material/Button'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
const clientId: string = process.env.REACT_APP_CLIENTID as string
const login = () => {
  return (
    <Card sx={{mt:8,width:500,mx:'auto',boxShadow:4}}>
      <CardContent sx ={{textAlign:'center'}}>
        <Typography sx ={{fontSize :25,color:'HighlightText'}}>github issue 管理介面</Typography>
        <Typography sx={{ fontSize: 15,color:'MenuText',mt:3,mx:'auto',mb:-2}}>登入github以開始操作</Typography>
      </CardContent>
      <CardActions sx={{mx:'auto'}}>
        <Button onClick={Redirect} size="large" sx={{mx:'auto',fontSize:20}}>login</Button>
      </CardActions>
    </Card>
  )
}
function Redirect() {
  window.location.replace(
    `https://github.com/login/oauth/authorize?client_id=${clientId};scope=repo,user`,
  )
}
export default login
