import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import "./App.css"

import Header from "./components/header/Header";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Home from "./pages/Home";
import FestivalDashboard from "./pages/FestivalDashboard";
// import Builder from "./pages/Builder";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="Container">
          <Header/>
          <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/login" element={ <Login/>}/>
            <Route path="/register" element={ <Register/>}/>
            <Route path="/festival/:id" element={<FestivalDashboard />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;