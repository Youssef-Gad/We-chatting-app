import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <p className="text-[12rem] text-primary font-light h-60">404</p>
      <p className="text-[3rem] uppercase">Oops! Nothing was found</p>
      <p className="text-center text-lg">
        The page you are looking for might have been removed had its name
        changed or is <br /> temporarily unavailable.{" "}
        <Link to="/" className="text-primary font-semibold hover:underline">
          Return to homepage
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
