import React, { createContext, useState } from 'react';
import api from '../api';

export const CollectionsContext = createContext();

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);

  const getCollections = (type) => {
    const url = "/api/entry/" + type;
    api
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        setCollections(data);
        console.log("NIGGEWR")
      })
      .catch((err) => alert(err));
  };

  return (
    <CollectionsContext.Provider value={{ collections, getCollections, setCollections }}>
      {children}
    </CollectionsContext.Provider>
  );
};