import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import "./Main.css";

function Main() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Main;
