import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    notifications: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Profile updated:', profile);
  };

  return (
    <div className='fixed h-full w-full overflow-y-auto bg-gradient-to-b from-neutral-900 via-stone-900 to-zinc-800'>
      <Navbar2 />
      <div className='flex'>
        <Sidebar />
        <div className='flex justify-center items-center w-full h-full p-6'>
          <form
            className='bg-[#333] text-white p-6 rounded-lg shadow-md w-full max-w-md'
            onSubmit={handleSubmit}
          >
            <h2 className='text-2xl font-bold mb-4'>Settings</h2>
            <div className='mb-4 text-white'>
              <label className='block text-sm font-bold mb-2' htmlFor='username'>
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={profile.username}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={profile.email}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={profile.password}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2' htmlFor='confirmPassword'>
                Confirm Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={profile.confirmPassword}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2' htmlFor='notifications'>
                Notifications
              </label>
              <input
                type='checkbox'
                id='notifications'
                name='notifications'
                checked={profile.notifications}
                onChange={handleChange}
                className='mr-2 leading-tight'
              />
              <span className='text-sm'>Enable notifications</span>
            </div>
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;