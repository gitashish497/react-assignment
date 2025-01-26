import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import StudentsPage from './components/StudentsPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Redirect to /students if loggedIn is true */}
        <Route 
          path="/" 
          element={loggedIn ? <Navigate to="/students" /> : <LoginPage setLoggedIn={setLoggedIn} />} 
        />
        
        {/* Students Page - Protect route based on loggedIn state */}
        <Route 
          path="/students" 
          element={loggedIn ? <StudentsPage setLoggedIn={setLoggedIn} /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
