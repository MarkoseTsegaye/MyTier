import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import React from 'react';

import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import Collection from "./pages/Collection"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/collection" element={
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
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App