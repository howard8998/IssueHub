import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Collapse,
  Alert,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import postissue from '../gitapi/postissue'
import { taskSchema } from '../formschema/taskSchema'
interface Props {
  open: boolean
  repo: string[]
  onclose: () => void
}
interface repo {
  nameWithOwner: string
}
interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}
const AddIssue = ({ open, onclose, repo }: Props) => {
  const [newTitle, setnewTitle] = useState('')
  const [newBody, setnewBody] = useState('')

  const [issuenamewithowner, setIssueNamewithOwner] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [erropen, seterrOpen] = useState(false)
  const [repoopen, setrepoOpen] = useState(false)
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnewTitle(event.target.value)
  }

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnewBody(event.target.value)
  }

  const handleEditdialogClose = () => {
    onclose()
  }
  const handlerepomenuOpen = () => {
    setnewBody('')
    setnewTitle('')
    setrepoOpen(true)
  }
  const handlerepomenuClose = (value: string) => {
    setrepoOpen(false)
    setIssueNamewithOwner(value)
  }
  const handleSubmit = async () => {
    try {
      taskSchema.validateSync({ title: newTitle, body: newBody })
      await postissue(issuenamewithowner, newTitle, newBody)
      handleEditdialogClose()
      window.location.reload()
      seterrOpen(false)
    } catch (err:any) {
      setSubmitError(err.message)
      seterrOpen(true)
    }
    console.log(submitError)
  }
  const RepoMenu = (props: SimpleDialogProps) => {
    const { onClose, selectedValue, open } = props
    const [selectedState, setSelectedState] = useState(selectedValue)
    const handleListItemClick = async (value: string) => {
      setSelectedState(value)
      onClose(value)
    }
    return (
      <Dialog onClose={() => onClose(selectedState)} open={open}>
        <List sx={{ pt: 0 }}>
          {repo.map((i) => (
            <ListItem disableGutters>
              <ListItemButton onClick={() => handleListItemClick(i)} key={i}>
                <ListItemAvatar></ListItemAvatar>
                <ListItemText primary={i} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    )
  }
  useEffect(() => {
    if (!issuenamewithowner) {
      setIssueNamewithOwner(repo[0])
    }
  })

  useEffect(() => {
    setnewBody('')
    setnewTitle('')
  }, [open])
  return (
    <Dialog open={open} onClose={handleEditdialogClose}>
      <DialogTitle>Post new issue</DialogTitle>
      <DialogContent sx={{ mb: -5 }}>
        <Button
          onClick={handlerepomenuOpen}
          sx={{
            color: 'GrayText',
            bgcolor: 'ButtonHighlight',
          }}
        >
          {issuenamewithowner}
        </Button>
        <RepoMenu
          selectedValue={issuenamewithowner}
          open={repoopen}
          onClose={handlerepomenuClose}
        />
      </DialogContent>
      <DialogContent style={{ minWidth: 400 }}>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="title"
          type="title"
          fullWidth
          variant="standard"
          value={newTitle}
          onChange={handleTitleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="body"
          label="body"
          type="body"
          fullWidth
          variant="standard"
          value={newBody}
          onChange={handleBodyChange}
        />
        <Collapse in={erropen}>
          <Alert severity="error">{submitError}</Alert>
        </Collapse>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditdialogClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
export default AddIssue
