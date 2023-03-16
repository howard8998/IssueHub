import {
  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIssue from '../gitapi/editissue'
import { taskSchema } from '../formschema/taskSchema'
import closeissue from '../gitapi/closeissue'
const TaskMenu = ({
  issuename,
  issueowner,
  issuenumber,
  title,
  body,
}: {
  issuename: string
  issueowner: string
  issuenumber: number
  title: string
  body: string
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [openeditdialog, setOpenEditDialog] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState(title)
  const [updatedBody, setUpdatedBody] = useState(body)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [erropen, seterrOpen] = useState(false)
  useEffect(() => {
    setUpdatedBody(body)
    setUpdatedTitle(title)
  },[anchorEl])
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(event.target.value)
  }

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedBody(event.target.value)
  }

  const handleEditdialogClose = () => {
    setOpenEditDialog(false)
  }
  const handleSubmit = async () => {
    try {
      taskSchema.validateSync({ title: updatedTitle, body: updatedBody })
      await EditIssue(
        issueowner,
        issuename,
        issuenumber,
        updatedTitle,
        updatedBody,
      )
      handleEditdialogClose()
      seterrOpen(false)
      window.location.reload()
    } catch (err: any) {
      setSubmitError(err.message)
      seterrOpen(true)
    }
  }
  const handleCloseissue = async () => {
    await closeissue(
      issueowner,
      issuename,
      issuenumber,
      updatedTitle,
      updatedBody,
    )
    handleEditdialogClose()
    window.location.reload()
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleedit = () => {
    handleClose()
    setOpenEditDialog(true)
  }
  return (
    <div>
      <IconButton
        sx={{ height: 40, mr: 1, mt: 1, width: 'auto' }}
        id="taskmenubutton"
        aria-controls={open ? 'taskmenubutton' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="taskmenu"
        aria-labelledby="taskmenubutton"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleedit}>Edit</MenuItem>

        <MenuItem onClick={handleCloseissue} sx={{ color: 'red' }}>
          Delete
        </MenuItem>
      </Menu>
      <Dialog open={openeditdialog} onClose={handleEditdialogClose}>
        <DialogTitle>Edit issue</DialogTitle>
        <DialogContent style={{ minWidth: 400 }}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="title"
            type="title"
            fullWidth
            variant="standard"
            defaultValue={title}
            value={updatedTitle}
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
            defaultValue={body}
            value={updatedBody}
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
    </div>
  )
}

export default TaskMenu
