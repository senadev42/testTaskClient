import { useState } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default App;
