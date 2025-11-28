// // frontend/src/App.jsx
// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import Login from "./pages/Login.jsx";
// import Register from "./pages/Register.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import NotFound from "./pages/NotFound.jsx";
// import { useAuth } from "./context/AuthContext.jsx";

// const App = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div className="min-h-screen bg-slate-100">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-4xl mx-auto flex items-center justify-between py-3 px-4">
//           <Link to="/" className="font-semibold text-lg">
//             Crypto Task Dashboard
//           </Link>
//           <nav className="flex items-center gap-4">
//             {user ? (
//               <>
//                 <span className="text-sm text-slate-600">
//                   Hi, {user.name}
//                 </span>
//                 <button
//                   onClick={logout}
//                   className="px-3 py-1 rounded bg-slate-800 text-white text-sm"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-sm text-slate-700">
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-3 py-1 rounded bg-slate-800 text-white text-sm"
//                 >
//                   Sign up
//                 </Link>
//               </>
//             )}
//           </nav>
//         </div>
//       </header>

//       <main className="max-w-4xl mx-auto px-4 py-6">
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>
//     </div>
//   );
// };

// export default App;



import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen w-full">
      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg text-blue-600">
            Crypto Task Dashboard
          </Link>
          {user ? (
            <button
              onClick={logout}
              className="text-sm bg-black text-pink px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/register"
              className="text-sm bg-black text-yellow px-3 py-1 rounded"
            >
              Sign up
            </Link>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex justify-center mt-10 px-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
