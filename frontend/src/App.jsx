import { useEffect } from "react";
import WebFont from "webfontloader";
import Home from "./components/Home/Home.jsx";
import Header from "./components/layout/Header/Header.jsx";

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
      <Home />
    </>
  );
}

export default App;
