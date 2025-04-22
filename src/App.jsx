import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './Components/AdminPanel';
import UserPanel from './Components/UserPanel';
import NGOPanel from './Components/NGOPanel';
import HomePage from './Components/HomePage';
import RegistrationForm from './pages/Register';
import LogInForm from './pages/Login';
import Dashboard from './pages/DashBoard';
import Layout from './layout/Layout'; // Add this
// import CreateFoodPost from './Components/CreateFoodPost';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Pages with Navbar */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <Layout>
              <AdminPanel />
            </Layout>
          }
        />
        <Route
          path="/user"
          element={
            <Layout>
              <UserPanel />
            </Layout>
          }
        />
        <Route
          path="/ngo"
          element={
            <Layout>
              <NGOPanel />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* Pages WITHOUT Navbar */}
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LogInForm />} />
      </Routes>
    </Router>
  );
};

export default App;
