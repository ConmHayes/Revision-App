import "./App.css";
import * as Pages from "./pages";
import { Routes, Route } from "react-router-dom";

import { Header, Footer } from "./components";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Pages.HomePage />} />

          <Route path="/timetables">
            <Route index element={<Pages.TimetablesPage />} />
            <Route path=":id" element={<Pages.TimetablePage />} />
          </Route>
          <Route path="/notes" element={<Pages.NotesPage />} />
          <Route path="/notes/:id" element={<Pages.NotePage />} />
          <Route path="*" element={<Pages.NotFoundPage />} />
        </Route>
        <Route path="/login" element={<Pages.LoginPage />} />
        <Route path="/signup" element={<Pages.SignupPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
