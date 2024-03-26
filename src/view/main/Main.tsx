import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import "./Main.css";
import Footer from "../footer/Footer";

function Main() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Main;
