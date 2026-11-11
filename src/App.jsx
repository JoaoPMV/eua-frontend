import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChapterTwo from "./pages/ChapterTwo";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChapterTwo />} />

        <Route path="/teacher" element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
