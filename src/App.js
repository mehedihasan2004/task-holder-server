import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="max-w-[1280px] mx-auto bg-[#f3ffff]">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
