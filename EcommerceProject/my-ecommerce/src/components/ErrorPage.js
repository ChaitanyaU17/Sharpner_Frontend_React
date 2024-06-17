import Header from "../Layout/Header";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div>
      <Header />
      <h1 className="text-center">An Error Occurred</h1>
      <h2 className="text-center">
        Couldn't Find MainPage- <Link to="/home">Click Here</Link>
      </h2>
    </div>
  );
};
export default ErrorPage;
