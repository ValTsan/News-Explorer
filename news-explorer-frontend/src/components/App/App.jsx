import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "../App/App.css";

import Footer from "../Footer/Footer";
import Main from "../Main/Main";

function App() {
  return (
    <>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
