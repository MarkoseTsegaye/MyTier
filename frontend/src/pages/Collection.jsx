import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../api'
import Entry from '../components/Entry'
const Collection = () => {

  
  const [entries, SetEntries] = useState([])

  useEffect(() => {
    getItems();
  },[])
  const getItems =() => {
    api.get("/api/entry/")
    .then((res) => res.data)
    .then((data) => {
        // Map the data and set it to the options state
        console.log(data)
        SetEntries(data)
    })
    .catch((err) => alert(err));
  }
  return (
    <div className='fixed top-0 -z-10 h-full w-full bg-[#1E1E1E] overflow-y-scroll'>
        <Navbar />
        <div className='w-full flex'>
          <div className='w-1/4 bg-black'></div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-5 md:gap-4 xl:gap-5 w-3/4 p-20'>
          
          {entries ? entries.map((entry) => (
            <Entry  props={entry} />
          )) : null}
        </div>

        </div>
    </div>
  )
}

export default Collection