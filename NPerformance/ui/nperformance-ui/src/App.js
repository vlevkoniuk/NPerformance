import logo from './logo.svg';
import Container from '@mui/material/Container';
import { Routes, Route, Link } from 'react-router';
import AppDefault from './Pages/Default';
import './App.css';
import { UserRequests } from './Pages/Userrequests';
import { Requests } from './Pages/Requests';
import { Layout } from './Shared/Layout';
import React, { useState, useContext } from "react";
import ConfigContext, { ConfigProvider } from './Shared/ConfigContext'
import {PerformanceProvider} from './Shared/PerformanceContext'


function App() {
  return (
    
    <ConfigProvider>
      <PerformanceProvider>
        <Layout>
          <div className="App">
            <Routes>
              <Route path="/" element={<AppDefault />} />
              <Route path="/configure/requestsbyuser" element={<UserRequests />} />
              <Route path="/configure/requests" element={<Requests />} />
            </Routes>
          </div>
        </Layout>
      </PerformanceProvider>
    </ConfigProvider>
      
    
      

    
    
  );
}

export default App;
// <Route exact path='/' component= {AppDefault } />