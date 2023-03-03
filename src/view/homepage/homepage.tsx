import getuser from '../../component/gitapi/getuser'
import logout from '../../component/gitapi/logout'
import gettoken from '../../component/gitapi/gettoken'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import IssueTask from './issuetask'
import { useState, useEffect } from 'react'
const HomePage = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await Promise.all([gettoken(), getuser()]);
      setIsInitialized(true);
    };
    initialize();
  }, []);
  return (
    <div style={{ width: 800, margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={logout} sx={{ ml: 'auto', mt: 'auto', mb: 0, mr: 0 }}>
          logout
        </Button>
      </div>
      <Card sx={{ width: 800, mx: 'auto', boxShadow: 4 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography style={{ margin: 'auto', textAlign: 'center', flex: 1 }}>
            login succes!
          </Typography>
          <div style={{ marginTop: 'auto' }}>
          {isInitialized && (
            <div style={{ marginTop: 'auto' }}>
              <IssueTask />
            </div>
          )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default HomePage