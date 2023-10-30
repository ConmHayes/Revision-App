import "./App.css";
import * as Pages from "./Pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pages.HomePage />} />
      <Route path="/login" element={<Pages.LoginPage />} />
      <Route path="/signup" element={<Pages.SignupPage />} />
      <Route path="/timetables" element={<Pages.TimetablesPage />} />
      <Route path="/timetables/:id" element={<Pages.TimetablePage />} />
      <Route path="/notes" element={<Pages.NotesPage />} />
      <Route path="*" element={<Pages.NotFoundPage />} />
    </Routes>
  );
}

export default App;

// Home  "/"
// LoginPage "/login"
// SignuPage "/signup"
// TimetablesPage "/timetables"
// TimetablePage "/timetables/:id"
// Notes "/notes"
// NotfoundPage "*"

// optional "/about"
