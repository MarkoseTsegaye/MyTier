import React, { createContext, useState } from 'react';
import api from '../api';

export const EntriesContext = createContext();

export const EntriesProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [open, setOpen] = useState(false);

  const getEntries = (type) => {
    const url = "/api/entry/" + type;
    api
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        setEntries(data);
      })
      .catch((err) => alert(err));
  };

  const addToCollection = () => {
    // Logic to add entry to collection
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <Button color="secondary" size="small" onClick={handleClose}>
      UNDO
    </Button>
  );

  return (
    <EntriesContext.Provider value={{ entries, getEntries, addToCollection, open, handleClose, action }}>
      {children}
    </EntriesContext.Provider>
  );
};