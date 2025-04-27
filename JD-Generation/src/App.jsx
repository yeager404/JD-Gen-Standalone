import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import JobForm from './components/JobForm';
import ApplyForm from './components/applyForm';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<JobForm />} />
        <Route path="/apply/:uid" element={<ApplyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
