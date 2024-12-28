import React, { useState,useEffect } from 'react'
import api from "../api";
import Entry from '../components/Entry';

const Home = () => {
    const [entries, setEntries] = useState([])

    useEffect(() => {
      getEntries();
   
  }, []);

    const getEntries = () => {
        api.get("/api/entry/3")
            .then((res) => res.data)
            .then((data) => {
                // Map the data and set it to the options state
                console.log(data)
                setEntries(data)
            })
            .catch((err) => alert(err));
    };
  return (
    <div>
        <Entry />
        <div>
          {entries.map((entry) => (
            <Entry title={entry.title} description={entry.description} author={entry.author} type={entry.type} />
          ))}
        </div>
    </div>
  )
}

export default Home