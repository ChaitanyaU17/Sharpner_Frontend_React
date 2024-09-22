import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search logic here
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('user logout successfully!');
    navigate('/login');
  }

  return (
    <header className="bg-gray-800 text-white w-full shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/home" className="text-2xl font-bold">
          <img
            src='data:image/png;base64,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'
            alt="Logo"
            className="w-12 h-12 rounded-full"
          />
        </Link>
        <h1 className="text-xl">Foodie</h1>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex w-1/2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="w-full px-4 py-2 rounded-l-md border border-gray-600 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-r-md"
        >
          Search
        </button>
      </form>

      {/* Cart and User Icons */}
      <div className="flex items-center space-x-4">
        <Link to="/cart">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 7M7 13l-2 5M17 13l2 5m-5-5V9m-4 4v-3m4 3V9m-4 0v3m4 0h4m-4-3h4m-8 6a1 1 0 110 2 1 1 0 010-2z"
            />
          </svg>
        </Link>
        <Link to="/profile">
          <img className="rounded-full h-10 w-10 object-cover" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7qNbq6urJNvP0CKtqVONk_yFrjymTAQZXeQ&s' alt='' />
        </Link>

        <button onClick={handleLogout} className="bg-red-400 p-2 rounded-lg">Logout</button>
      </div>
    </header>
  );
};

export default Header;
