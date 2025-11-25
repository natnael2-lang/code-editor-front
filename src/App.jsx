import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./components/editor";
import Login from "./components/login";
import AdminDashboard from "./components/adminDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Login />} />
      
        <Route path="/admin" element={<AdminDashboard />} />
         
          <Route path="/login" element={<Login />} />
        <Route path="/login/:id" element={<Login />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
