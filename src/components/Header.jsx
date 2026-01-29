import { useState, useRef, useEffect } from "react";
import useCheckAuth from "../hooks/auth/useCheckAuth";
import { useLogout, useLogoutAll } from "../hooks/auth/index.js";

export const Header = () => {
  const { user , loading } = useCheckAuth();
  const { logout , loading : logoutLoading } = useLogout();
  const { logoutAll , loading : logoutAllLoading } = useLogoutAll();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
        <div className="h-16 w-full animate-pulse bg-gray-100/50 rounded-xl mb-6"></div>
    );
  }

  if (!user) {
      // Don't show header if not logged in (presumably handled by page redirects, but safe fallback)
      return null;
  }

  return (
    <header className="flex items-center justify-between py-4 px-2 mb-8 select-none">
      <div className="flex items-center gap-4">
        {/* Logo or App Name could go here */}
        <div className="flex items-center gap-2">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
           </div>
           <span className="text-xl font-bold text-gray-900 tracking-tight">CloudBox</span>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 p-1.5 pl-3 pr-2 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 group"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 font-medium group-hover:text-gray-600 transition-colors">
              {user.email}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20 ring-2 ring-white">
            {getInitials(user.name)}
          </div>
        </button>
        
        {/* Dropdown Menu */}
        {isDropdownOpen && (
             <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-2xl shadow-[0_10px_38px_-10px_rgba(22,23,24,0.35),0_10px_20px_-15px_rgba(22,23,24,0.2)] ring-1 ring-black ring-opacity-5 focus:outline-none py-2 z-50 transform opacity-100 scale-100 transition-all duration-200">
             <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
               <p className="text-sm font-semibold text-gray-900">{user.name}</p>
               <p className="text-xs text-gray-500 truncate">{user.email}</p>
             </div>
             
             <div className="py-1">
                <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                   <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                   Profile
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                   <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                   Settings
                </a>
             </div>
             <div className="border-t border-gray-100 my-1"></div>
             <button
                onClick={logout}
                disabled={logoutLoading}
                className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                <svg className="w-5 h-5 text-red-400 group-hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                {logoutLoading ? 'Logging out...' : 'Sign out'}
             </button>
             <button
                onClick={logoutAll}
                disabled={logoutAllLoading}
                className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                <svg className="w-5 h-5 text-red-400 group-hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                {logoutAllLoading ? 'Logging out...' : 'Sign out all'}
             </button>
           </div>
        )}
      </div>
    </header>
  );
};
