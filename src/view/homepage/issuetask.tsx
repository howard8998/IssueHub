import { Button, Card, IconButton } from '@mui/material'
import fetchIssue from '../../component/gitapi/fetchissue'
import { TimeFormatter } from '../../component/recoil/TimeFormatter'
import { SetStateAction, useState } from 'react'
import { useEffect } from 'react'
import { Typography } from '@mui/material'
import StatesFilterDialog from './statesfilterdialog'
import StatesChangeDialog from './stateschangedialog'
import TaskMenu from './taskmenu'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import TextField from '@material-ui/core/TextField/TextField'

import { Box } from '@mui/system'
interface Issue {
  number: number
  title: string
  url: string
  labels: { nodes: { name: string }[] }
  createdAt: string
  updatedAt: string
  body: string
  repository: {
    nameWithOwner: string
    url: string
  }
}

const states: string[] = ['ALL', 'OPEN', 'IN PROGESS', 'DONE']
const statesColor: { [key: string]: string } = {
  OPEN: 'green',
  'IN PROGESS': 'red',
  DONE: 'black',
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
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
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
      <Button
        sx={{ ml: 1, mt: 1, color: statesColor[state] }}
        onClick={handleClickOpen}
      >
        {state === undefined ? 'NONE' : state }
      </Button>
      <StatesChangeDialog
        issuename={issuename}
        issuenumber={issuenumber}
        issueowner={issueowner}
        selectedValue={state}
        open={open}
        onClose={handleClose}
      />
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
        sx={{
          maxWidth:400,
          fontSize: 18,
          m: 2.5,
          fontFamily: 'inherit',
          height: 'auto',
          wordWrap: 'break-word'
        }}
      >
        {body}
      </Typography>
      <Typography
        sx={{
          width: 200,
          fontSize: 10,
          mt: 3,
          mr: 2.5,
          mb: 1,
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
  const [order, setorder] = useState('asc')
  const [serchBody, setSerchBody] = useState('')
  const [serchTitle, setSerchTitle] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleSerchBodyChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSerchBody(event.target.value)
  }
  const handleSerchTitleChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSerchTitle(event.target.value)
  }
  const handleClose = (value: string) => {
    setOpen(false)
    setstate(value)
  }
  const heandleOrderBottom = () => {
    if (order === 'asc') {
      setorder('desc')
    }
    if (order === 'desc') {
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
  const filteredAndSortedIssues = [...issues]
  .filter((issue) => issue.body.includes(serchBody))
  .filter((issue) => issue.title.includes(serchTitle))
  .filter((issue) => state === 'ALL' || issue.labels.nodes[0]?.name === state)
  .sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime()
    const timeB = new Date(b.createdAt).getTime()
    return order === 'asc' ? timeB - timeA : timeA - timeB
  })
  const issueTasks = filteredAndSortedIssues.map((issue, i) => (
    <IssueTask
      key={i}
      title={issue.title}
      body={issue.body}
      state={issue.labels.nodes[0]?.name}
      issuenumber={issue.number}
      issuename={issue.repository.nameWithOwner.split('/')[1]}
      issueowner={issue.repository.nameWithOwner.split('/')[0]}
      createdAt={TimeFormatter(issue.createdAt)}
      updatedAt={TimeFormatter(issue.updatedAt)}
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
          {state}
        </Button>
        <StatesFilterDialog
          selectedValue={state}
          open={open}
          onClose={handleClose}
        />
        <Box sx={{ ml: 'auto', mr: 0.5 }}>
          <TextField
            label="Title"
            variant="standard"
            value={serchTitle}
            onChange={handleSerchTitleChange}
          />
        </Box>
        <TextField
          label="Body"
          variant="standard"
          value={serchBody}
          onChange={handleSerchBodyChange}
        />

        <IconButton sx={{ mr: 5 }} onClick={heandleOrderBottom}>
          {order === 'asc' ? (
            <KeyboardDoubleArrowDownIcon />
          ) : (
            <KeyboardDoubleArrowUpIcon />
          )}
        </IconButton>
      </div>

      {issueTasks}
      
      <BottomDetector />
    </div>
  )
}

export default IssueTasks
