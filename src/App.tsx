import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <ToastContainer position="bottom-right" />
      <Outlet />
    </>
  );
}

export default App;
