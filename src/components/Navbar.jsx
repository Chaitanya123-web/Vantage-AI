import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BriefcaseIcon,
  CpuChipIcon
} from "@heroicons/react/24/outline";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

function NavList({ isAuthenticated, userName, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <ul className="my-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-3">
      <li className="font-medium text-sm">
        <a
          href="/#features"
          className="px-4 py-2 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-all"
        >
          Features
        </a>
      </li>
      <li className="font-medium text-sm">
        <a
          href="/#how-it-works"
          className="px-4 py-2 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-all"
        >
          How It Works
        </a>
      </li>

      {isAuthenticated ? (
        <>
          {/* Dashboard */}
          <li className="font-medium text-sm">
            <button
              onClick={() => navigate("/dashboard")}
              className={`px-4 py-2 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-all ${
                isActive("/dashboard")
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : ""
              }`}
            >
              Dashboard
            </button>
          </li>

          {/* Portfolio */}
          <li className="font-medium text-sm">
            <button
              onClick={() => navigate("/portfolio")}
              className={`flex items-center gap-1 px-4 py-2 rounded-full hover:bg-green-50 hover:text-green-700 transition-all ${
                isActive("/portfolio")
                  ? "bg-green-100 text-green-700 font-bold"
                  : ""
              }`}
            >
              <BriefcaseIcon className="h-5 w-5" />
              Portfolio
            </button>
          </li>

          {/* ML Playground */}
          <li className="font-medium text-sm">
            <button
              onClick={() => navigate("/ml-playground")}
              className={`flex items-center gap-1 px-4 py-2 rounded-full hover:bg-indigo-50 hover:text-indigo-700 transition-all ${
                isActive("/ml-playground")
                  ? "bg-indigo-100 text-indigo-700 font-bold"
                  : ""
              }`}
            >
              <CpuChipIcon className="h-5 w-5" />
              ML Playground
            </button>
          </li>

          {/* User Menu */}
          <li className="font-medium text-sm relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:bg-blue-100 transition-all">
              <UserCircleIcon className="h-5 w-5" />
              {userName || "Account"}
            </button>
            <div className="absolute right-0 top-full mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
              <div className="p-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl w-full text-left"
                >
                  👤 My Profile
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl w-full text-left"
                >
                  ⚙️ Settings
                </button>
              </div>
              <hr className="border-gray-100" />
              <div className="p-2">
                <button
                  onClick={onLogout}
                  className="block px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl w-full text-left"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </li>
        </>
      ) : (
        <>
          <li className="font-medium text-sm">
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full text-blue-700 hover:bg-blue-50 transition-all font-semibold"
            >
              Login
            </button>
          </li>
          <li className="font-medium text-sm">
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg font-semibold"
            >
              Sign Up
            </button>
          </li>
        </>
      )}
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const checkAuthentication = async () => {
    try {
      const response = await axios.get("/api/profile");
      if (response.data?.name) {
        setIsAuthenticated(true);
        setUserName(response.data.name);
      }
    } catch {
      setIsAuthenticated(false);
      setUserName("");
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    const handleResize = () =>
      window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
    setUserName("");
    navigate("/login");
  };

  return (
    <nav className="mx-auto max-w-screen-xl px-6 py-4 sticky top-0 z-50">
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-3xl border border-gray-200/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold bg-gradient-to-r from-[#06A77D] to-[#D5C67A] bg-clip-text text-transparent"
          >
            Vantage AI
          </button>

          <div className="hidden lg:block">
            <NavList
              isAuthenticated={isAuthenticated}
              userName={userName}
              onLogout={handleLogout}
            />
          </div>

          <button
            className="ml-auto h-8 w-8 text-gray-700 hover:bg-blue-50 rounded-full lg:hidden flex items-center justify-center"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {openNav && (
          <div className="pt-4 mt-4 border-t border-gray-200 lg:hidden">
            <NavList
              isAuthenticated={isAuthenticated}
              userName={userName}
              onLogout={handleLogout}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarSimple;