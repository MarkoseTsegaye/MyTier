import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Sidebar from '../components/Sidebar';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Stack } from '@mui/material';
const Settings = () => {
  const [activeSection, setActiveSection] = useState('');
  const [activeSection2, setActiveSection2] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Profile updated:', profile);
  };

  const accountSection = () => {
    return (
      <div className='flex flex-col w-full text-white text-2xl'>
        <h1 className='self-center justify-center'>Account</h1>
        <div>
          <div onClick={() => setActiveSection2('password')} className='flex flex-col  w-full p-5  text-white text-2xl hover:bg-[#333333]'>
              Change Password
            </div>
            <div onClick={() => setActiveSection2('username')} className='flex flex-col   w-full p-5  text-white text-2xl hover:bg-[#333333]'>
              Change Username
            </div>
            <div onClick={() => setActiveSection2('picture')} className='flex flex-col   w-full p-5  text-white text-2xl hover:bg-[#333333]'>
              Change Profile Picture
            </div>
        </div>
      </div>
    );
  }
  const helpSection = () => {
    return (
      <div className='flex flex-col items-center justify-center text-white text-2xl hover:bg-[#333333]'>
        Help
      </div>
    );
  }

  return (
    <div className='fixed h-full w-full overflow-y-auto bg-gradient-to-b from-neutral-900 via-stone-900 to-zinc-800'>
      <Navbar2 />
      <div className='flex w-full bg-white'>
        <Sidebar />
        <div className='w-1/5  bg-[#555555] border-r-2 space-y-2 [&_:is(div)]:p-4 flex flex-col border-[#333333] '>
            <div onClick={() => setActiveSection('account')} className='flex flex-col items-center justify-center text-white text-2xl hover:bg-[#333333]'>
              Account
            </div>
            <div onClick={() => setActiveSection('help')} className='flex flex-col items-center justify-center text-white text-2xl hover:bg-[#333333]'>
              Help
            </div>
            <div onClick={() => setActiveSection('logout')} className='flex flex-col items-center justify-center text-white text-2xl hover:bg-[#333333]'>
              Logout
            </div> 
        </div>
        <div className='w-2/5 h-full bg-[#555555]'>
        {activeSection === 'account' ? accountSection() : activeSection==="help" ? helpSection() : null}
        </div>
        <div className='w-4/5 h-full bg-green-200'>
        {activeSection2 === 'picture' ? accountSection() : activeSection2==="password" ? helpSection() : null}
        </div>
      </div>
    </div>
  );
};

export default Settings;