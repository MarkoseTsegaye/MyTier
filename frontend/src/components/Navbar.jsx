import React, { useState } from 'react';
import { Box, Button, Input, ClickAwayListener, Select, MenuItem, FormControl, InputBase } from '@mui/material';
import api from "../api";
// #import API next

import SearchEntry from './SearchItems/SearchEntry';
const Navbar = () => {
  const [searchItem, setSearchItem] = useState('');
  const [items, setItems] = useState([]);
  const [lengthOfList, setLengthOfList] = useState(0);
  let debounceTimeout; 

  const [selection, setSelection] = useState('anime');

  const handleGet = (searchTerm) => {
    if (selection === "anime"){
      getAnimes(searchTerm)

    }
    else if (selection === "game"){
      getGames(searchTerm)
    }
    else if (selection === "book"){
      getBooks(searchTerm)
    }
    else if (selection === "tv"){
      getTV(searchTerm)
    }
  };
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
      setItems([]); 
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
          type: "anime"
        }));

        setItems(animeInfo);
        
        setLengthOfList(results.length)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const getGames = (query) => {
  
  handleClickIn();
  const url = new URL('https://api.rawg.io/api/games');
  url.searchParams.append('search', query); 
  url.searchParams.append('ordering', "-added"); 

  url.searchParams.append('key', "a9cb9d71fcf34ceea1b944ed4e7301e7"); 

  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const results = data.results;
      const gameInfo = results.map((result) => ({
        title: result.name || 'No name available',
        developer: result.released,
        imageUrl: result.background_image || 'No image available',
        genre: result.genres[0]?.name || 'No genre available',
        type: "game"
      }));
      
      setItems(gameInfo);
      console.log(gameInfo);
      setLengthOfList(results.length)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

  const getBooks = (query) => {
    const url = new URL('https://openlibrary.org/search.json');
    handleClickIn()
    url.searchParams.append('title', query); 
    url.searchParams.append('limit', 15)
    fetch(url, {
      method: "GET",
      
    })
      .then((response) => response.json())
      .then((data) => {
        const results = data.docs;
        const bookInfo = results.map((result) => ({
          title: result.title || 'No name available',
          imageUrl: result.cover_i ? `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg` : 'No image available',
          author: result.author_name?.[0] || 'No author available',
          genre: result.subject[0],
          type: "book"
        }));
        
        setItems(bookInfo);
        console.log(bookInfo)
        setLengthOfList(results.length)

      })
      .catch((error) => {
        console.error("Error:", error);
      });
      };
    
  const getTV = (query) => {
    handleClickIn()
    const url = new URL('http://www.omdbapi.com')

    url.searchParams.append('s', query); 
    url.searchParams.append('page ', '1'); 

    url.searchParams.append('apikey', "2d989794")

    fetch(url, {
      method: "GET",
      
    })
     .then((response) => response.json())
     .then((data) => {
      console.log(data)
        const results = data.Search;
        const tvInfo = results.map((result) => ({
          title: result.Title || 'No name available',
          imageUrl: result.Poster || 'No image available',
          format: result.type,
          type: "tv"
        }));
        
        setItems(tvInfo);
        console.log(tvInfo)
        setLengthOfList(results.length)
      })
     .catch((error) => {
        console.error("Error:", error);
      });
  };
;
  
  
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
                    <MenuItem sx={{borderRadius:0}} value={'tv'}>TV</MenuItem>
                    <MenuItem sx={{borderRadius:0}} value={'book'}>Book</MenuItem>

                </Select>
              </FormControl>

          <div></div>
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
          
            <Button
              variant="contained"
              onClick={() => handleGet(searchItem)} 
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
        </Box>

        <div className="max-h-[300px] sm:max-h-[450px] lg:max-h-[550px] max-h-[600px] overflow-y-auto">
          {/* {focused ? items.map((item) => (
            <SearchEntry  data={item} length={lengthOfList} />
          )) : null} */}
          {focused ? (
    items.length > 0 ? (
        items.map((item, index) => 
          <ClickAwayListener onClickAway={handleClickAway}>

        <SearchEntry key={index} data={item} length={lengthOfList} />
        </ClickAwayListener>)
    ) : (
      <SearchEntry data={{title: "f", type:"anime"}} length={1} />
    )
) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
