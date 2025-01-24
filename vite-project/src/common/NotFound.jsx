import { Link } from "react-router";

//Scenario : This incokes when wrong routing path is called

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-custom-green mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">Page Not Found</p>
      <Link to="/dashboard" className="btn-secondary">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
