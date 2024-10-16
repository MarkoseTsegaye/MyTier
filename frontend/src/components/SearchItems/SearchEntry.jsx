import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';


const SearchEntry = ({data}) => {
  const theme = useTheme();
   
  return (
    <div>
    
    <Card sx={{ display: 'flex',  width: {
              xs: '300px',  // 100% width on extra-small screens
              sm: '400px',   // 75% width on small screens
              md: '500px',   // 50% width on medium screens
              lg: '600px',   // 40% width on large screens
              xl: '800px',   // 30% width on extra-large screens
            } , borderRadius:0, borderBottom: '1px solid black', paddingLeft:.5, paddingBottom:.5, paddingTop:.5}}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardMedia
            component="img"
            sx={{ width: 50, height:50, object:'fill'}}
            image={data.genreTag ==="Hentai" ? null:data.imageUrl}
            alt="NSFW"
          />
            <CardContent sx={{ flex: '1 0 auto', height:50, flexDirection:'column'}}>
              <Typography component="div" variant="h8" sx={{ fontSize: {
                xs: 14,
                md: 18,
              }}}>
              {data.title.length > 32 ? data.title.slice(0,31) + "...": data.title}
              </Typography>
              
              <Typography
                variant="h2"
                component="div"
                fontSize={10}
                sx={{ color: 'text.secondary' }}
              >
                {data.genreTag === 'Hentai' ? 'NSFW' : data.genreTag}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' } }}
    >
  sx
    </Button>

            </Box>
          </Box>
        
          </Card>
    </div>
  )
}


export default SearchEntry