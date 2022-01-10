import logo from './logo.svg';
import Container from '@mui/material/Container';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
//import { Routes, Route, Link } from 'react-router';
import AppDefault from './Pages/Default';
import './App.css';
import UserRequests from './Pages/UserRequests';
import Requests from './Pages/Requests';
import { Layout } from './Shared/Layout';
import React, { useState, useContext } from "react";
import ConfigContext, { ConfigProvider } from './Shared/ConfigContext'
import {PerformanceProvider} from './Shared/PerformanceContext'


function App() {
  const [conf, setConf] = useState({})

  return (
    
    <ConfigContext.Provider value={{conf,setConf,}} >
      <PerformanceProvider>
        <Layout>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<AppDefault />} />
              <Route exact path="/configure/requestsbyuser" element={<UserRequests />} />
              <Route exact path="/configure/requests" element={<Requests />} />
            </Routes>
          </div>
        </Layout>
      </PerformanceProvider>
    </ConfigContext.Provider>
      
    
      

    
    
  );
}

export default App;
// <Route exact path='/' component= {AppDefault } />