import React, { useState } from 'react';
import { Box, Button, Input, ClickAwayListener, Select, MenuItem, FormControl, InputBase } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu} from '@mui/material';
import api from "../api";
// #import API next

import SearchEntry from './SearchItems/SearchEntry';
import { Logout, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const Navbar2 = ({refresh}) => {
  

  const [anchorEl, setAnchorEl] = useState(null);
  
  const openSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeSettings = () => {
    setAnchorEl(null);
  };

  
const navigate = useNavigate();

  const logout = () => {
    navigate("/logout");
  }
  
  return (
    
    <div className="w-full bg-[#333333] flex z-90  h-20 overflow-hidden">

      <div className=' flex w-[10%] text-center items-center sm:ml-auto text-white'>
        <img  src='/material-layout-stack-svgrepo-com.svg' width={48}></img>
        <h1 className=" flex justify-self-center mx-auto text-3xl font-bold">MyTier</h1>
          
        </div>
        
         
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#333', marginLeft:'auto' }}>
        <h1 className='ml-auto text-white text-2xl mr-6'>Roddy</h1>
        <AccountCircleIcon className='ml-auto mr-10 hover:bg-gray-600' 
        style={{ fontSize: 60, color:'#007bff' }}
        onClick={openSettings}/>

      </Box>
      <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeSettings}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'None',
                color: '#333',
              }}
              className='text-center'
            >
              
              <MenuItem onClick={closeSettings}>
              <Settings/>Settings</MenuItem>

              <MenuItem onClick={logout}>
                <Logout/> Logout
              </MenuItem>

              
      
            </Menu>
    </div>
  );
};

export default Navbar2;
