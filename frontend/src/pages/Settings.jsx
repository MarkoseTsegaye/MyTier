import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Sidebar from '../components/Sidebar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('');
  const [activeSubSection, setActiveSubSection] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Profile updated:', profile);
  };

  const accountSection = () => {
    return (
      <div className='flex flex-col w-full text-white text-2xl'>
        <h1 className='self-center justify-center mb-4'>Account</h1>
        <div>
          <div onClick={() => setActiveSubSection('password')} className='flex flex-col w-full p-5 text-white text-2xl hover:bg-[#444444] cursor-pointer'>
            Change Password
          </div>
          <div onClick={() => setActiveSubSection('username')} className='flex flex-col w-full p-5 text-white text-2xl hover:bg-[#444444] cursor-pointer'>
            Change Username
          </div>
          <div onClick={() => setActiveSubSection('picture')} className='flex flex-col w-full p-5 text-white text-2xl hover:bg-[#444444] cursor-pointer'>
            Change Profile Picture
          </div>
        </div>
      </div>
    );
  };

  const helpSection = () => {
    return (
      <div className='flex flex-col items-center justify-center text-white text-2xl hover:bg-[#444444] cursor-pointer'>
        Help
      </div>
    );
  };

  const renderSubSectionContent = () => {
    switch (activeSubSection) {
      case 'password':
        return (
          <div className='text-white p-4'>
            <h2 className='text-2xl mb-4'>Change Password</h2>
            <form onSubmit={handleSubmit}>
              <input type='password' placeholder='Current Password' className='w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white' />
              <input type='password' placeholder='New Password' className='w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white' />
              <input type='password' placeholder='Confirm New Password' className='w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white' />
              <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white'>Submit</button>
            </form>
          </div>
        );
      case 'username':
        return (
          <div className='text-white p-4'>
            <h2 className='text-2xl mb-4'>Change Username</h2>
            <form onSubmit={handleSubmit}>
              <input type='text' placeholder='New Username' className='w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white' />
              <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white'>Submit</button>
            </form>
          </div>
        );
      case 'picture':
        return (
          <div className='text-white p-4'>
            <h2 className='text-2xl mb-4'>Change Profile Picture</h2>
            <form onSubmit={handleSubmit}>
              <input type='file' className='w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white' />
              <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white'>Submit</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setActiveSubSection(''); // Reset the sub-section when a new main section is selected
  };

  return (
    <div className='fixed h-full w-full overflow-y-auto bg-gradient-to-b from-neutral-900 via-stone-900 to-zinc-800'>
      <Navbar2 />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-1/5 bg-[#555555] border-r-2 space-y-2 flex flex-col border-[#333333] p-4'>
          <div onClick={() => handleSectionClick('account')} className='flex flex-col items-center justify-center text-white text-2xl hover:bg-[#12121] cursor-pointer p-4 rounded-md'>
            Account
          </div>
          <div onClick={() => handleSectionClick('help')} className='flex flex-col items-center justify-center text-white text-2xl hover:bg-[#444444] cursor-pointer p-4 rounded-md'>
            Help
          </div>
          <div onClick={() => handleSectionClick('logout')} className='flex flex-col items-center justify-center text-white text-2xl hover:bg-[#444444] cursor-pointer p-4 rounded-md'>
            Logout
          </div>
        </div>
        <div className='w-2/5 h-full bg-[#555555] p-4'>
          {activeSection === 'account' ? accountSection() : activeSection === 'help' ? helpSection() : null}
        </div>
        <div className='w-2/5 h-full bg-[#333333] p-4'>
          {renderSubSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;