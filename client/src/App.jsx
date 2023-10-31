import "./App.css";
import * as Pages from "./pages";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Pages.HomePage />} />

        <Route path="/timetables">
          <Route index element={<Pages.TimetablesPage />} />
          <Route path=":id" element={<Pages.TimetablePage />} />
        </Route>
        <Route path="/notes" element={<Pages.NotesPage />} />
        <Route path="*" element={<Pages.NotFoundPage />} />
      </Route>
      <Route path="/login" element={<Pages.LoginPage />} />
      <Route path="/signup" element={<Pages.SignupPage />} />
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
