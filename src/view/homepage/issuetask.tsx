import {
  Button,
  Card,
  Dialog,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import fetchIssue from '../../component/gitapi/fetchissue'
import { useState } from 'react'
import { useEffect } from 'react'
import { Typography } from '@mui/material'
import { SimpleDialogProps } from './homepage'
import CircleIcon from '@mui/icons-material/Circle'
interface Issue {
  title: string
  url: string
  state: string
  createdAt: string
  updatedAt: string
  body: string
  repository: {
    nameWithOwner: string
    url: string
  }
}
const states: string[] = ['ALL', 'OPEN', 'IN PROGESS', 'CLOSED']
const statesColor: { [key: string]: string } = {
  OPEN: 'green',
  'IN PROGESS': 'red',
  CLOSED: 'black',
  ALL: 'gray',
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
              <ListItemText primary={states === 'CLOSED' ? 'DONE' : states} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}
const IssueTask = ({
  title,
  body,
  state,
}: {
  title: string
  body: string
  state: string
}) => {
  let i = 2
  return (
    <Card
      sx={{
        mt: 2,
        width: 700,
        minHeight: 100,
        mx: 'auto',
        mb: 2,
        boxShadow: 4,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <Button sx={{ color: statesColor[state] }}>
        {state === 'CLOSED' ? 'DONE' : state}
      </Button>
      <IconButton sx={{ height: 40, mr: 1, mt: 1, width: 'auto' }}>
        <MoreVertIcon />
      </IconButton>
      <Typography sx={{ width: 800, fontSize: 20, ml: 2.5 }}>
        {title}
      </Typography>
      <Typography sx={{ width: 800, fontSize: 18, m: 2.5 }}>{body}</Typography>
    </Card>
  )
}
const IssueTasks = () => {
  const [issues, setIssues] = useState<Issue[]>([])
  const [open, setOpen] = useState(false)
  const [state, setstate] = useState(states[0])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setstate(value)
  }
  useEffect(() => {
    const fetchIssues = async () => {
      const result = await fetchIssue()
      if (result) {
        setIssues(result.slice(0, 10))
      }
    }
    fetchIssues()
  }, [])
  const filteredIssues =
    state === 'ALL' ? issues : issues.filter((issue) => issue.state === state)
  const issueTasks = filteredIssues.map((issue, i) => (
    <IssueTask
      key={i}
      title={issue.title}
      body={issue.body}
      state={issue.state}
    />
  ))
  return (
    <div>
      <Button
        sx={{
          height: 40,
          ml: 1,
          mt: 1,
          color: statesColor[state],
        }}
        onClick={handleClickOpen}
      >
        {state === 'CLOSED' ? 'DONE' : state}
      </Button>
      <StatesDialog selectedValue={state} open={open} onClose={handleClose} />
      {issueTasks}
    </div>
  )
}

export default IssueTasks
