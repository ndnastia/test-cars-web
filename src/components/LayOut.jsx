import React from "react";

import Navigation from "./Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import { Loader } from "./Loader/Loader";
const Layout = () => {
  return (
    <>
      <header>
        <div>
          <Navigation/>
        </div>
      </header>
      <div>
        <main>
          <Suspense fallback={<Loader/>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default Layout;