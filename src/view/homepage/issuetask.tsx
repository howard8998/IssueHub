import { Button, Card} from '@mui/material'

import fetchIssue from '../../component/gitapi/fetchissue'
import { useState } from 'react'
import { useEffect } from 'react'
import { Typography } from '@mui/material'
import StatesDialog from './statesdialog'
import TaskMenu from './taskmenu'

interface Issue {
  number: number
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

const IssueTask = ({
  title,
  body,
  state,
  issuenumber,
  issuename,
  issueowner,
}: {
  title: string
  body: string
  state: string
  issuenumber: number
  issuename: string
  issueowner: string
}) => {
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
      <Button sx={{ ml: 1, mt: 1, color: statesColor[state] }}>
        {state === 'CLOSED' ? 'DONE' : state}
      </Button>
      <TaskMenu
        issuename={issuename}
        issueowner={issueowner}
        issuenumber={issuenumber}
        title={title}
        body={body}
        
      />
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
      issuenumber={issue.number}
      issuename={issue.repository.nameWithOwner.split('/')[1]}
      issueowner={issue.repository.nameWithOwner.split('/')[0]}
    />
  ))
  return (
    <div>
      <Button
        sx={{
          height: 40,
          ml: 5,
          mt: 1,
          color: statesColor[state],
          fontSize: 20,
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
