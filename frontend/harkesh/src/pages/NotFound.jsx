
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="text-center mt-10">
    <h1 className="text-2xl font-semibold mb-2">404 - Not found</h1>
    <p className="text-sm text-slate-600 mb-4">
      The page you are looking for does not exist.
    </p>
    <Link to="/" className="text-sm text-slate-800 underline">
      Go to dashboard
    </Link>
  </div>
);

export default NotFound;
