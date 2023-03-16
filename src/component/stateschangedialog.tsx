import {
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Icon,
  ListItemText,
} from '@mui/material'

import changeLabel from '../gitapi/changelabel'
import CircleIcon from '@mui/icons-material/Circle'
import { useState } from 'react'
const states: string[] = ['OPEN', 'IN PROGESS', 'DONE']
interface SimpleDialogProps {
  issuename: string
  issueowner: string
  issuenumber: number
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}
const statesColor: { [key: string]: string } = {
  OPEN: 'green',
  'IN PROGESS': 'red',
  DONE: 'black',
}
const StatesDialog = (props: SimpleDialogProps) => {
  const {
    onClose,
    selectedValue,
    open,
    issuename,
    issuenumber,
    issueowner,
  } = props
  const [selectedState, setSelectedState] = useState(selectedValue)
  const handleListItemClick = async (value: string) => {
    setSelectedState(value)
    onClose(value)
    changeLabel(issueowner, issuename, issuenumber, value)
    window.location.reload()
  }

  return (
    <Dialog onClose={() => onClose(selectedState)} open={open}>
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
export default StatesDialog
