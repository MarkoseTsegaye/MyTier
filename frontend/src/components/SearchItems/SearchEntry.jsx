import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import api from '../../api';
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';

const SearchEntry = ({data, length, refresh}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { media } = useParams(); // Get the media parameter from the URL


 
  
  let info = {}
  
  if (data.type === "anime"
  ){
    info = {
      "title":data.title,
      "genre":data.genreTag,
      "author":data.studio,
      "image":data.imageUrl
    }
    
  }
  if (data.type === "book"
  ){

    info = {
      "title":data.title,
      "genre":data.genre,
      "author":data.author,
      "image":data.imageUrl
    }
  }
  if (data.type === "game"
  ){

    info = {
      "title":data.title,
      "author":data.developer,
      "image":data.imageUrl,
      "genre":data.genre,
    

    }
  }
  if (data.type === "tv"
  ){

    info = {
      "title":data.title,
      "image":data.imageUrl,
      "author" : data.genre,
      
      


    }
  }

  const title = (info.title)
  const author = (info.author)
  const picture = (info.image)
  const type = (data.type)

 

  const addToCollection = (e) => {
    
    e.preventDefault();
    handleCLick()
    console.log(title + author  + type)

    const url = "/api/entry/"+ type
    api.post(url, {title,picture,author,type})
    .then((res) => res.data)
    .then((data) => {
        // Map the data and set it to the options state
        console.log(data)
    })
    .catch((err) => alert(err));

    refresh(media)
    refresh(media)
    refresh(media)
    refresh(media)
    
  }
  const handleCLick = () => {
      setOpen(true);
    };
    const handleClose = (
      event,
      reason
    ) => {
      if (reason === "clickaway") {
        return;
        console.log(event);
      }
  
      setOpen(false);
    };

    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  return (
    <div className='z-50 relative h-100 overflow-y-hidden'>
    {length > 0 ? 
    <Card className="z-50 overflow-y-hidden" sx={{ display: 'flex',  width: {
              xs: '300px',  // 100% width on extra-small screens
              sm: '400px',   // 75% width on small screens
              md: '500px',   // 50% width on medium screens
              lg: '600px',   // 40% width on large screens
              xl: '800px',   // 30% width on extra-large screens
            } , borderRadius:0, borderBottom: '1px solid black', paddingLeft:.5, paddingBottom:.5, paddingTop:.5, zIndex:'20'}}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }} className='overflow-y-hidden'>
          <CardMedia
            component="img"
            sx={{ width: 50, height:50, object:'fill'}}
            
            image={info.genre ==="Hentai" ? null:info.image}
            alt="No Cover"
          />
            <CardContent sx={{ flex: '1 0 auto', height:50, flexDirection:'column',  width: {
              xs: '160px',  // 100% width on extra-small screens
              sm: '260px',   // 75% width on small screens
              md: '360px',   // 50% width on medium screens
              lg: '460px',   // 40% width on large screens
              xl: '660px',   // 30% width on extra-large screens
            } }}>
              <Typography component="div" variant="h8" sx={{ fontSize: {
                xs: 14,
                md: 18,
              }}}>
              {info.title.length > 40 ? info.title.slice(0,40) + "...": info.title}
              </Typography>
              
              <Typography
                variant="h2"
                component="div"
                fontSize={10}
                sx={{ color: 'text.secondary' }}
              >
                {info.genre === 'Hentai' ? 'NSFW' : info.genre}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' }, justifyContent: 'center'}}
    onClick={addToCollection}>
  Add
    </Button>
    <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Entry Added"
          action={action}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // Position the Snackbar at the top center
        />

            </Box>
          </Box>
        
          </Card> : <Card sx={{ display: 'flex',  width: {
              xs: '300px',  // 100% width on extra-small screens
              sm: '400px',   // 75% width on small screens
              md: '500px',   // 50% width on medium screens
              lg: '600px',   // 40% width on large screens
              xl: '800px',   // 30% width on extra-large screens
            } , borderRadius:0, borderBottom: '1px solid black', paddingLeft:.5, paddingBottom:.5, paddingTop:.5}}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}></Box> </Card>}
    </div>
  )
}


export default SearchEntry