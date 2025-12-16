import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParentPage from "./pages/ParentPage";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import Projects from "./admin/Projects";
import Contacts from "./admin/Contacts";
import ProtectedRoute from "./admin/ProtectedRoute";

import "./App.css";
import CVUpload from "./admin/CVUpload";
import Resume from "./components/Resume";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<ParentPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/resume" element={<Resume />} />
        
   

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/cv-upload"
          element={
            <ProtectedRoute>
              <CVUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
