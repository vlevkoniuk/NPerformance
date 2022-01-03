import logo from './logo.svg';
import Container from '@mui/material/Container';
import { Routes, Route, Link } from 'react-router';
import AppDefault from './Pages/Default';
import './App.css';
import { UserRequests } from './Pages/userrequests';
import { Layout } from './Shared/Layout';
import React, { useState, useContext } from "react";
import ConfigContext, { ConfigProvider } from './Shared/ConfigContext'


function App() {
  return (
    
    <ConfigProvider>
      <Layout>
        <div className="App">
          <Routes>
            <Route path="/" element={<AppDefault />} />
            <Route path="/requests" element={<UserRequests />} />
          </Routes>
        </div>
      </Layout>
    </ConfigProvider>
      
    
      

    
    
  );
}

export default App;
// <Route exact path='/' component= {AppDefault } />