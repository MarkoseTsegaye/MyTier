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
    <div className='fixed top-0 -z-10 h-full w-full bg-[#1E1E1E]'>
        <Navbar />
        <div>
          
          {entries ? entries.map((entry) => (
            <Entry  props={entry} />
          )) : null}
        </div>
    </div>
  )
}

export default Collection