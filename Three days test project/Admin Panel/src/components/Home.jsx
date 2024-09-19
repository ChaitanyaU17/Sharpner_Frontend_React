import { Link, useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert('Logged out successfully!');
    navigate('/login');
  }

    return (
    <div className="p-6 ">
      <div className="flex items-center justify-between mb-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 p-2 rounded-lg">Logout</button>
      </div>
      
      <nav>
        <ul className="flex items-center gap-x-4 text-xl font-semibold">
          <li className="mb-4 bg-black p-2 rounded-md h-32 w-48 pt-10 flex justify-center">
            <Link to="/manage-categories" className="text-blue-500 hover:underline">
              Manage Categories
            </Link>
          </li>
          <li className="mb-4 bg-black p-2 rounded-md h-32 w-44 pt-10 flex justify-center">
            <Link to="/manage-recipes" className="text-blue-500 hover:underline">
              Manage Recipes
            </Link>
          </li>
          <li className="mb-4 bg-black p-2 rounded-md h-32 w-44 pt-10 flex justify-center">
            <Link to="/manage-orders" className="text-blue-500 hover:underline">
              Manage Orders
            </Link>
          </li>
        </ul>
      </nav>

      
    </div>
  );
};

export default Home;

  