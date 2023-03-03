import { Button, Card, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import getIssue from '../../component/gitapi/fetchissue'
import { useState } from 'react'
import { useEffect } from 'react'
import { Typography } from '@mui/material'
interface Issue {
    title: string
    url: string
    createdAt: string
    updatedAt: string
    body: string
    repository: {
      nameWithOwner: string
      url: string
    }
  }
  
const IssueTask = ({ title ,body }: { title: string,body: string }) => {
  const status: string[] = ['Open', 'In Progress', 'Done']
  const statusColor: { [key: string]: string } = {
    Open: 'black',
    'In Progress': 'red',
    Done: 'green',
  }
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
        flexWrap:'wrap'
      }}
    >
      <Button sx={{ height: 40, ml: 1, mt: 1, color: statusColor[status[i]] }}>
        {status[i]}
      </Button>
      <IconButton sx={{ height: 40, mr: 1, mt: 1, width: 'auto' }}>
        <MoreVertIcon />
      </IconButton>
      <Typography sx={{width:800,fontSize:20,ml:2.5}}>{title}</Typography>
      <Typography sx={{width:800,fontSize:18,m:2.5}}>{body}</Typography>
    </Card>
  )
}

const IssueTasks = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    useEffect(() => {
      const fetchIssues = async () => {
        const result = await getIssue();
        if (result) {
          setIssues(result.slice(0,10));
        }
      };
      fetchIssues();
    }, []);
  
    const issueTasks = issues.map((issue, i) => (
      <IssueTask key={i} title={issue.title} body={issue.body} />
    ));
    return <div>{issueTasks}</div>;
  };
  

export default IssueTasks
