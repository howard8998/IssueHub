import { Button, Card, IconButton } from '@mui/material'

import fetchIssue from '../../component/gitapi/fetchissue'
import { useState } from 'react'
import { useEffect } from 'react'
import { Typography } from '@mui/material'
import StatesDialog from './statesdialog'
import TaskMenu from './taskmenu'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
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
  createdAt,
  updatedAt,
}: {
  title: string
  body: string
  state: string
  issuenumber: number
  issuename: string
  issueowner: string
  createdAt: string
  updatedAt: string
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
      <Typography
        sx={{ width: 800, fontSize: 20, ml: 2.5, fontWeight: 'bold' }}
      >
        {title}
      </Typography>
      <Typography
        sx={{ width: 450, fontSize: 18, m: 2.5, fontFamily: 'inherit' }}
      >
        {body}
      </Typography>
      <Typography
        sx={{
          width: 150,
          fontSize: 10,
          mt: 3,
          mr: 2.5,
          mb: 2,
          textAlign: 'end',
          color: 'GrayText',
        }}
      >
        created at:{createdAt}
        <br />
        updated at:{updatedAt}
      </Typography>
    </Card>
  )
}

const IssueTasks = () => {
  const [issues, setIssues] = useState<Issue[]>([])
  const [open, setOpen] = useState(false)
  const [state, setstate] = useState(states[0])
  const [newEndCursor, setnewEndCursor] = useState('')
  const [nextEndCursor, setnextEndCursor] = useState('')
  const [hasNextPage, sethasNextPage] = useState(true)
  const [order,setorder] = useState('asc')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setstate(value)
  }
  const heandleOrderBottom =()=>{
    if (order ==='asc') {
      setorder('desc')
    }
    if (order ==='desc') {
      setorder('asc')
    }
  }
  useEffect(() => {
    const fetchIssues = async () => {
      if (hasNextPage) {
        const result = await fetchIssue(newEndCursor)
        if (result) {
          setIssues([...issues, ...result.issues.nodes.slice(0, 10)])
          setnextEndCursor(result.issues.pageInfo.endCursor)
          sethasNextPage(result.issues.pageInfo.hasNextPage)
        }
      }
    }
    fetchIssues()
  }, [newEndCursor])
  const BottomDetector = () => {
    const [isBottom, setIsBottom] = useState(false)

    useEffect(() => {
      function handleScroll() {
        if (
          window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight
        ) {
          setIsBottom(true)
        } else {
          setIsBottom(false)
        }
        return () => window.removeEventListener('scroll', handleScroll)
      }

      window.addEventListener('scroll', handleScroll)
    }, [])
    useEffect(() => {
      if (isBottom) {
        setnewEndCursor(nextEndCursor)
      }
    }, [isBottom])
    return null
  }
  const filteredIssues =
    state === 'ALL' ? issues : issues.filter((issue) => issue.state === state)
  const sortedIssues = filteredIssues.sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime()
    const timeB = new Date(b.createdAt).getTime()
    return order==='asc'?(timeB - timeA):(timeA-timeB)
  })

  const issueTasks = sortedIssues.map((issue, i) => (
    <IssueTask
      key={i}
      title={issue.title}
      body={issue.body}
      state={issue.state}
      issuenumber={issue.number}
      issuename={issue.repository.nameWithOwner.split('/')[1]}
      issueowner={issue.repository.nameWithOwner.split('/')[0]}
      createdAt={issue.createdAt.split('T')[0]}
      updatedAt={issue.updatedAt.split('T')[0]}
    />
  ))
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          sx={{
            height: 40,
            ml: 4.5,
            mt: 1,
            color: statesColor[state],
            fontSize: 20,
          }}
          onClick={handleClickOpen}
        >
          {state === 'CLOSED' ? 'DONE' : state}
        </Button>
        <StatesDialog selectedValue={state} open={open} onClose={handleClose} />
        <IconButton sx={{mr:5}} onClick = {heandleOrderBottom}>
          {order==='asc'?<KeyboardDoubleArrowDownIcon />:<KeyboardDoubleArrowUpIcon/>}
        </IconButton>
      </div>

      {issueTasks}
      <BottomDetector />
    </div>
  )
}

export default IssueTasks
