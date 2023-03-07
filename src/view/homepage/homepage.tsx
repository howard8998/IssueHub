import logout from '../../component/gitapi/logout'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogTitle,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import Button from '@mui/material/Button'
import IssueTask from './issuetask'
import { useState, useEffect } from 'react'
import CircleIcon from '@mui/icons-material/Circle'

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}
const states: string[] = ['ALL', 'Open', 'In Progress', 'Done']
const statesColor: { [key: string]: string } = {
  Open: 'black',
  'In Progress': 'red',
  Done: 'green',
  ALL: 'gray',
}
const HomePage = () => {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(states[0])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setSelectedValue(value)
  }
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
            <Button
              sx={{
                height: 40,
                ml: 1,
                mt: 1,
                color: statesColor[selectedValue],
              }}
              onClick={handleClickOpen}
            >
              {selectedValue}
            </Button>
            <StatesDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
            <div style={{ marginTop: 'auto' }}>
              <IssueTask />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
function StatesDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value: string) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }}>
        {states.map((states) => (
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => handleListItemClick(states)}
              key={states}
            >
              <ListItemAvatar>
                <Icon sx={{ color: statesColor[states] }}>
                  <CircleIcon />
                </Icon>
              </ListItemAvatar>
              <ListItemText primary={states} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}
export default HomePage
