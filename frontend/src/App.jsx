import { useEffect } from "react";
import WebFont from "webfontloader";
import Home from "./components/Home/Home.jsx";
import Header from "./components/layout/Header/Header.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins"],
      },
    });
  });
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/about"
            element={<h1 className="bg-red-400 text-4xl">About us</h1>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
