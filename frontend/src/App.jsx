import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import React from 'react';

import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import Collection from "./pages/Collection"
import Settings from "./pages/Settings";
import { AuthProvider } from "./pages/AuthContext";
import Ranking from "./pages/Ranking";
import { EntriesContext } from "./context/EntriesContext";
import { CollectionsProvider } from "./context/CollectionsProvider";


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}



function App() {
  return (
    <CollectionsProvider>

    <AuthProvider >
    <BrowserRouter>
      <Routes>
      <Route path="/collection/:media" element={
                    <ProtectedRoute>
<Collection />
</ProtectedRoute>
} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ranking/:media"
          element={
            <ProtectedRoute>
              <Ranking />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/settings" element={ 
                      <ProtectedRoute>

          <Settings />
          </ProtectedRoute>
} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </CollectionsProvider>

  )
}

export default App