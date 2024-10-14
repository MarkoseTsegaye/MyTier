import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
const Entry = (props) => {

    const entry = (
        <React.Fragment>
          <Card sx={{width: 300,height:300}}>
            <CardContent>
                {props.title}
            </CardContent>
            <CardContent>
                {props.description}
            </CardContent>
            <CardContent>
                {props.author}
            </CardContent>
            <CardContent>
                {props.type}
            </CardContent>
            </Card>
            
        </React.Fragment>
    )
  return (
    <div>
    <Card variant="outlined">{entry}</Card>
    </div>
  )
}

export default Entry