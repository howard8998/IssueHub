import logout from '../../component/gitapi/logout'
import { Card, CardContent, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import IssueTask from './issuetask'

export 

const HomePage = () => {
  return (
    <div style={{ width: 800, margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={logout} sx={{ ml: 'auto', mt: 'auto', mb: 0, mr: 0 }}>
          logout
        </Button>
      </div>
      <Card sx={{ width: 800, mx: 'auto', boxShadow: 4, mb: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginTop: 'auto' }}>
            <div style={{ marginTop: 'auto' }}>
              <IssueTask />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HomePage
