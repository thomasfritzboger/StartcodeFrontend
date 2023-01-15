import React from "react";
import { Link, Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Homepage1</h2>

      <Outlet />
    </div>
  );
}

export default Home;
