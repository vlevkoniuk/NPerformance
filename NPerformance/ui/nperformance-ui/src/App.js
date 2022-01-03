import logo from './logo.svg';
import Container from '@mui/material/Container';
import { Routes, Route, Link } from 'react-router';
import AppDefault from './Pages/Default';
import './App.css';
import { UserRequests } from './Pages/userrequests';
import { Layout } from './Shared/Layout';

function App() {
  return (
    <Layout>
      <div className="App">
      <Routes>
        <Route path="/" element={<AppDefault />} />
        <Route path="/requests" element={<UserRequests />} />
      </Routes>
    </div>
    </Layout>
    
  );
}

export default App;
// <Route exact path='/' component= {AppDefault } />