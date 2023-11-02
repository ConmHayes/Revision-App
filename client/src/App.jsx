import "./App.css";
import * as Pages from "./pages";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Pages.LoginPage />} />
        <Route path = "signup" element = {<Pages.SignupPage />} />
        {/* Create a layout for the rest of the routes that includes the Header */}
        <Route element={<LayoutWithHeader />}>
          <Route path = "home" element={<Pages.HomePage />} />
          <Route path="timetables" element={<Pages.TimetablesPage />} />
          <Route path="notes" element={<Pages.NotesPage />} />
          <Route path="notes/:id" element={<Pages.NotePage />} />
          <Route path="*" element={<Pages.NotFoundPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

// Create a separate layout component with the Header
function LayoutWithHeader({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default App;
