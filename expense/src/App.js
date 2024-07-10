import Signup from "./Auth/Signup";
import Header from './components/Header';
import UpdateProfile from "./components/UpdateProfile";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword";
import ExpenseForm from "./components/ExpenseForm";
import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector(state=>state.authentication.isLogin);
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogin
        ? <Header />
        : <Navigate to="/signup" replace />,
      children: [
        {
          path: "/update-profile",
          element: <UpdateProfile />
        }
        ,{
          path: '/',
          element: <ExpenseForm/>
        }
      ]
    },
    {
      path: "/signup",
      children: [
        {
          path: "/signup",
          element: isLogin
            ? <Navigate to="/" replace />
            : <Signup  />
        },
        {
          path: "/signup/forget-pass",
          element: <ForgetPassword />
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
