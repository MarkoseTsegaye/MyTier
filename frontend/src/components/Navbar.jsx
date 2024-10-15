import React, { useState } from 'react';
import { Box, TextField, Button, Autocomplete, Input, ClickAwayListener } from '@mui/material';
import SearchEntry from './SearchItems/SearchEntry';

const Navbar = () => {
  const [searchItem, setSearchItem] = useState('');
  const [animes, setAnimes] = useState([]);
  let debounceTimeout; // Declare debounceTimeout here


  const [focused, setFocused] = useState(false)
  const handleClickIn = () => {
    setFocused(true);
  }
  const handleClickAway = () => {
    setFocused(false);
  }
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    // Clear the previous timeout
    clearTimeout(debounceTimeout);

    // Debounce the API call to wait before executing getAnimes
    
  };

  const getAnimes = (query) => {
    if (!query) {
      setAnimes([]); // Clear the anime list if the search is empty
      return;
    }
    handleClickIn()

    const url = new URL('https://api.jikan.moe/v4/anime');
    url.searchParams.append('q', query); // Use 'q' to search for the string

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        const results = data.data; // Assuming the data is in the 'data' field
        const animeInfo = results.slice(0, 10).map(result => ({
          id: result.mal_id, // Add unique key (e.g., `mal_id` from API response)
          title: result.title_english || result.title_japanese,
          imageUrl: result.images.jpg?.image_url || "No image available",
          studio: result.studios[0]?.name || "No studio available",
          genreTag: result.genres[0]?.name || "No genre available",
        }));

        setAnimes(animeInfo); // Update the state with fetched anime info
      })
      .catch(error => {
        console.error('Error:', error); // Handle errors here
      });
  };

  return (
    <div className='w-full bg-[#333333] h-20'>
      <div className='justify-center align-center items-center flex flex-col'>
        <Box
          sx={{
            width: 500,
            height: 75,
            border: '1px solid #333',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
            boxShadow: 2,
          }}
        >
          <Input
            value={searchItem}
            options={[1]}
            
            onChange={handleInputChange}
            placeholder="Search..."
            sx={{
              width: '100%',
              height: '100%',
              padding: '10px'
            }}
          />
          <ClickAwayListener onClickAway={handleClickAway}>
    <Button
            variant="contained"
            onClick={() => getAnimes(searchItem)} // Call search directly on button click
            sx={{
              width: '20%',
              height: '100%',
              backgroundColor: '#007bff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            Search
          </Button>
          </ClickAwayListener>
        </Box>
        {focused ? animes.map((anime) => (
          <SearchEntry key={anime.id} data={anime} /> // Add the unique key prop here
        )): null}
      </div>
    </div>
  );
};

export default Navbar;
