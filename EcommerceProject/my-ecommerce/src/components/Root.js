import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Outlet } from "react-router-dom";
const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Root;
