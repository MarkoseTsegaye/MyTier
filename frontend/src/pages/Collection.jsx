import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';
import Entry from '../components/Entry';
import FilterBox from '../components/FilterBox';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';


const Collection = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();
  const { media } = useParams(); // Get the media parameter from the URL

  // Function to fetch items
  const getItems = (m) => {
    const url = "/api/entry/" + m;
    api
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        setEntries(data); // Set the data to state
      })
      .catch((err) => alert(err));
  };

  // Fetch items on component mount
  useEffect(() => {
    getItems(media); // Fetch items based on the media parameter
  }, [media]);

 
  return (
    <div className='fixed h-full w-full overflow-y-hidden overflow-x-hidden bg-gradient-to-b from-neutral-900 via-stone-900 to-zinc-800 '>
            <Navbar className='z-20 top-0 fixed' refresh={getItems} /> {/* Passing the getItems function */}

      <div className='w-full  absolute z-0 bg-[bg-gradient-to-b from-neutral-900 via-stone-900 to-zinc-800] flex'>
        
        <Sidebar  />
        <div className='w-full bg-gradient-to-b from-neutral-900 via-stone-900 to-zinc-800'>
          <div>
            <FilterBox className="z-0" />
          </div>
          <div className='grid pb-40 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 grid-rows-auto overflow-y-auto gap-3 h-screen md:gap-3 xl:gap-4 w-full p-10'>
            {/* Ensure the entries are rendered properly with a key */}
            {entries.length > 0 ? (
              entries.map((entry) => (
                <Entry key={entry.title} props={entry} refresh={getItems}/> // Use a unique key like entry.id
              ))
            ) : (
              <p className='text-white text-2xl text-center'>No entries found! Add an entry above to start your collection.</p> // Show a fallback message if no entries are available
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
