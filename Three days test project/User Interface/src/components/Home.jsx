import Header from "../pages/Header";
import Footer from "../pages/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container p-5">
        <h1 className="text-4xl font-bold">Welcome to the Restaurant App</h1>
        <div className="home-links mt-10">
          {/* Browse Categories */}
          <Link to="/categories">
            <button className="text-blue-600 bg-black p-5 mr-4">Browse Categories</button>
          </Link>

          {/* View/Edit Profile */}
          <Link to="/profile">
            <button className="text-blue-600 bg-black p-5 mr-4">Your Profile</button>
          </Link>

          {/* View Cart */}
          <Link to="/cart">
            <button className="text-blue-600 bg-black p-5 mr-4">View Cart</button>
          </Link>

          {/* Checkout */}
          <Link to="/checkout">
            <button className="text-blue-600 bg-black p-5 mr-4">Checkout</button>
          </Link>

          {/* Order Status */}
          <Link to="/orders">
            <button className="text-blue-600 bg-black p-5 mr-4">Order Status</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
