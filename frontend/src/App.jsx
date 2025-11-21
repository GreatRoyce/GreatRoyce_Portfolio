import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParentPage from "./pages/ParentPage";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParentPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
