import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';
import Entry from '../components/Entry';
import FilterBox from '../components/FilterBox';

const Collection = () => {
  const [entries, setEntries] = useState([]);

  // Function to fetch items
  const getItems = () => {
    api
      .get("/api/entry/")
      .then((res) => res.data)
      .then((data) => {
        setEntries(data); // Set the data to state
      })
      .catch((err) => alert(err));

    console.log("I've been called man RIGHT HERE");
  };

  // Fetch items on component mount
  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className='fixed top-0 -z-10 h-full w-full bg-[#1E1E1E] overflow-y-scroll'>
      <Navbar refresh={getItems} /> {/* Passing the getItems function */}
      <div className='w-full flex'>
        <div className='w-1/5 bg-black'></div>
        <div className='w-3/4'>
          <div>
            <FilterBox className="z-0" />
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-5 gap-2 md:gap-4 xl:gap-5 w-full p-10'>
            {/* Ensure the entries are rendered properly with a key */}
            {entries.length > 0 ? (
              entries.map((entry) => (
                <Entry key={entry.title} props={entry} /> // Use a unique key like entry.id
              ))
            ) : (
              <p>No entries found</p> // Show a fallback message if no entries are available
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
