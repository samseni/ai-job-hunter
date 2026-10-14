import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import JobSearch from "./pages/JobSearch";
import Resume from "./pages/Resume";
import ResumeMatch from "./pages/ResumeMatch";
import CoverLetter from "./pages/CoverLetter";
import Tracker from "./pages/Tracker";

// All routes share the sidebar Layout. Backend/AI wiring comes in later stages.
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/match" element={<ResumeMatch />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route path="/tracker" element={<Tracker />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
