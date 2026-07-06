import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar"
import Footer from "./components/footer"

import { BookProvider } from "./utils/GlobalState";
import  Home  from './pages/home';
import Results from './pages/results';
import Saved  from './pages/saved';
import NoMatch from "./pages/NoMatch";



function App() {
  return (
    <Router>
      <div className="stretcher">
        <BookProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
          <Footer></Footer>
        </BookProvider>
      </div>
    </Router>
  );
}


export default App;
