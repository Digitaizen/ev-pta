import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import BoardMembers from './pages/BoardMembers';
import Store from './pages/Store';
import Spiritwear from './pages/Spiritwear';
import Membership from './pages/Membership';
import Blog from './pages/Blog';
import CommunityPartners from './pages/CommunityPartners';
import Scholarships from './pages/Scholarships';
import Volunteers from './pages/Volunteers';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Helmet>
            <title>East View High School PTA - Georgetown, Texas</title>
            <meta name="description" content="Official website of East View High School PTA in Georgetown, Texas. Join us in supporting our students, teachers, and community." />
            <meta name="keywords" content="East View High School, PTA, Georgetown Texas, parent teacher association, school support" />
          </Helmet>

          <Header />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/board-members" element={<BoardMembers />} />
              <Route path="/store" element={<Store />} />
              <Route path="/spiritwear" element={<Spiritwear />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/community-partners" element={<CommunityPartners />} />
              <Route path="/scholarships" element={<Scholarships />} />
              <Route path="/volunteers" element={<Volunteers />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
