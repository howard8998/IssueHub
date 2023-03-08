import { Dialog, List, ListItem, ListItemButton, ListItemAvatar, Icon, ListItemText } from "@mui/material"
import { SimpleDialogProps } from "./homepage"
import CircleIcon from '@mui/icons-material/Circle'
const states: string[] = ['ALL', 'OPEN', 'IN PROGESS', 'CLOSED']
const statesColor: { [key: string]: string } = {
  OPEN: 'green',
  'IN PROGESS': 'red',
  CLOSED: 'black',
  ALL: 'gray',
}
const StatesDialog = (props: SimpleDialogProps)=> {
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
                <ListItemText primary={states === 'CLOSED' ? 'DONE' : states} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    )
  }
export default StatesDialog