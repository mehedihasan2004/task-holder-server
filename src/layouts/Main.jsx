import React from "react";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Sideber, SideberBeforLogin } from "../components";
import { AuthContext } from "../context/AuthProvider";

const Main = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="flex">
        {user ? (
          <Sideber />
        ) : (
          <Link to="/sign-up">
            <SideberBeforLogin />
          </Link>
        )}
        <div className="ml-3">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;
