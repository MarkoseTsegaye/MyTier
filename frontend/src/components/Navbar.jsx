import React, { useState } from 'react';
import { Box, Button, Input, ClickAwayListener, Select, MenuItem, FormControl, InputBase } from '@mui/material';
import SearchEntry from './SearchItems/SearchEntry';

const Navbar = () => {
  const [searchItem, setSearchItem] = useState('');
  const [animes, setAnimes] = useState([]);
  let debounceTimeout; 

  const selectionChoices = ['anime', 'book', 'show', 'movie', 'game'];
  const [selection, setSelection] = useState('anime');
  const handleSelect = (e) => {
    setSelection(e.target.value);
  };

  const [focused, setFocused] = useState(false);
  const handleClickIn = () => {
    setFocused(true);
  };
  const handleClickAway = () => {
    setFocused(false);
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    // Clear the previous timeout
    clearTimeout(debounceTimeout);
  };

  const getAnimes = (query) => {
    if (!query) {
      setAnimes([]); 
      return;
    }
    handleClickIn();

    const url = new URL('https://api.jikan.moe/v4/anime');
    url.searchParams.append('q', query); 
    url.searchParams.append('order_by', 'popularity');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const results = data.data;
        const animeInfo = results.slice(0, 30).map((result) => ({
          id: result.mal_id,
          title: result.title_english || result.title_japanese || 'No name available',
          imageUrl: result.images.jpg?.image_url || 'No image available',
          studio: result.studios[0]?.name || 'No studio available',
          genreTag: result.genres[0]?.name || 'No genre available',
        }));

        setAnimes(animeInfo);
        console.log(animeInfo);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="w-screen bg-[#333333] flex h-20">
      <div className="place-self-center ml-8 sm:ml-14 md:ml-20 lg:ml-30 xl:ml-40 h-1/2">
        <Box
          sx={{
            width: {
              xs: '310px',  // 100% width on extra-small screens
              sm: '410px',   // 75% width on small screens
              md: '510px',   // 50% width on medium screens
              lg: '610px',   // 40% width on large screens
              xl: '810px',   // 30% width on extra-large screens
            },
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#f9f9f9',
            boxShadow: 2,
            
          }}
        >
          <FormControl sx={{ width: {
            xs:'60%',
            sm:'70%',
            md:'60%',
            lg: '40%'
            }, height: '100%' }}>
            <Select
              value={selection}
              onChange={handleSelect}
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '0',
                backgroundColor: '#ffffff',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Removes the outline
                },
                '&:focus .MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Removes the outline when focused
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Removes the outline on hover
                },
              }}
            >
                    <MenuItem sx={{borderRadius:0}} value={'anime'}>Anime</MenuItem>
                    <MenuItem sx={{borderRadius:0}} value={'game'}>Game</MenuItem>
                    <MenuItem sx={{borderRadius:0}} value={'show'}>Show</MenuItem>
                    <MenuItem sx={{borderRadius:0}} value={'movie'}>Movie</MenuItem>
                </Select>
              </FormControl>


          <InputBase
            value={searchItem}
            onChange={handleInputChange}
            placeholder="Search..."
            sx={{
              width: {
                xs: '90%',  // 100% width on extra-small screens
                sm: '95%',   // 75% width on small screens
                md: '98%',   // 50% width on medium screens
                lg: '100%',   // 40% width on large screens
                xl: '100%',   // 30% width on extra-large screens
              },              height: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '0',
              backgroundColor: '#ffffff',
            }}
          />
          
          <ClickAwayListener onClickAway={handleClickAway}>
            <Button
              variant="contained"
              onClick={() => getAnimes(searchItem)} 
              sx={{
                width: '20%',
                height: '100%',
                backgroundColor: '#007bff',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
                borderRadius: 0,
                padding: '10px',
              }}
            >
              Search
            </Button>
          </ClickAwayListener>
        </Box>
        <div className="max-h-[300px] sm:max-h-[450px] lg:max-h-[550px] max-h-[600px] overflow-y-auto">
          {focused ? animes.map((anime) => (
            <SearchEntry key={anime.id} data={anime} />
          )) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
