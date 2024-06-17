
import "./App.css";
import { Suspense, lazy } from "react";
import { CartContextProvider } from "./context_store/Cart_Context";
import Profile from "./components/UpdateProfile";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import About from "./components/About";
import Root from "./components/Root";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import "./App.css";
import ContactUS from "./components/ContactUs"
import AuthForm from "./Auth/AuthForm"
import AuthContext from "./context_store/AuthContext";
import { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const Store = lazy(()=>import('./components/Store'));
  const ProductDetailPage = lazy(()=>import('./components/ProductDetailPage'));
  const authCtx = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/about", element: <About /> },
        {
          path: "/",
          element: authCtx.userLoggedIn ? <Navigate to="/store" replace />:<Navigate to="/user-auth"  />
        },
        {
          path: "/store",
          element:authCtx.userLoggedIn ?  <Suspense fallback={<p>Loading....</p>}><Store /></Suspense> :<Navigate to="/user-auth"  />
        },
        {
          path: "/home",
          element: <Home />
        },
        {
          path: "/contact",
          element: <ContactUS />
        },
        {
          path: "/product-detail/:id",
          element:<Suspense fallback={<p>Loading...</p>}> <ProductDetailPage /></Suspense>
        },
        {
          path: "/user-auth",
          element: <AuthForm />
        },
        {
          path: "/change-password",
          element: authCtx.userLoggedIn
            ? <Profile />
            : <Navigate to="/user-auth" />
        }
      ]
    }
  ]);
  return (
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
  );
}

export default App;
