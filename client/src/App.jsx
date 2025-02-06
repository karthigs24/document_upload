import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import DocumentUpload from './pages/DocumentUpload' // Import DocumentUpload component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/document-upload" element={<DocumentUpload />} />{' '}
          {/* Add route for DocumentUpload */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
