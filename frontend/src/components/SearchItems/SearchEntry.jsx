import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const SearchEntry = ({data}) => {
  const theme = useTheme();
   const searchEntry = (
        <React.Fragment>
          <Card className="w-1/2" sx={{width: 200,height:50}}>
            <CardContent className='flex flex-row'>
                <h1>{data.title}</h1>
                <img className="object-cover w-full h-full" src={data.imageUrl} width={10} height={10} />
                <p>{data.genreTag}</p>
            </CardContent>
            
            </Card>
            
        </React.Fragment>

    )
  return (
    <div>
    
    <Card sx={{ display: 'flex',  width:500 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardMedia
            component="img"
            sx={{ width: 50, height:50, object:'fill'}}
            image={data.genreTag ==="Hentai" ? null:data.imageUrl}
            alt="NSFW"
          />
            <CardContent sx={{ flex: '1 0 auto', height:50, flexDirection:'column'}}>
              <Typography component="div" variant="h7">
                {data.title}
              </Typography>
              
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: 'text.secondary' }}
              >
                {data.genreTag === 'Hentai' ? 'NSFW' : data.genreTag}
              </Typography>

            </Box>
          </Box>
        
          </Card>
    </div>
  )
}


export default SearchEntry