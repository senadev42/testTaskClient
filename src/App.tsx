import { useState } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
