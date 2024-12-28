import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const FilterBox = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { media } = useParams(); // Get the media parameter from the URL
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const capitalizedMedia = capitalizeFirstLetter(media);


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box className="filter-box z-0"  sx={{ 
        display: 'flex', 
        justifyContent: 'space-evenly', 
        alignItems: 'center', 
        backgroundColor: '#121212', 
        padding: '8px', 
        height: '40px', 
        borderRadius: '0px', 
        width: '100%',
        zIndex:'0'
      }}>
        <h1 className='text-2xl text-white'>{capitalizedMedia}</h1>
      {/* Dark Mode Filter Box */}
      <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
        <IconButton onClick={handleMenuOpen} sx={{ color: 'white' }}>
          <FilterList />
        </IconButton>
        <span style={{ marginLeft: '8px' }}>Sort By</span>
      </Box>

      {/* Filter Menu (Horizontal Menu) */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'None',
          color: 'white',
        }}
      >
        <MenuItem onClick={handleMenuClose}>Highest Rated</MenuItem>
        <MenuItem onClick={handleMenuClose}>Newest</MenuItem>
        <MenuItem onClick={handleMenuClose}>Lowest Rated</MenuItem>
        <MenuItem onClick={handleMenuClose}>Oldest</MenuItem>

      </Menu>

      

      {/* Filter Menu (Horizontal Menu) */}
      
    </Box>
  );
};

export default FilterBox;
