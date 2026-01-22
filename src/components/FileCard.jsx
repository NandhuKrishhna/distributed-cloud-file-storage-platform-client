import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CONFIG } from "../utils/config";
import useDownloadFile from "../hooks/useDownloadFile";

export const FileCard = ({ file }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const isDirectory = file.type === "Directory";
 console.log("File",file)
  const { downloadFile } = useDownloadFile();
  const params = useParams();
  console.log("params", params)
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuToggle = (e) => {
    e.stopPropagation(); 
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpen = (e) => {
    
    if (isDirectory) {
      navigate(`/${file.name}`);
    } else {
      const url = params.folderName 
        ? `${CONFIG.BASE_URL}/${params.folderName}/${file.name}`
        : `${CONFIG.BASE_URL}/${file.name}`;
      window.open(url);
    }
    e.stopPropagation();
    setIsMenuOpen(false);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const currentFolder = params.folderName ? `${params.folderName}/` : "";
    downloadFile(`${currentFolder}${file.name}`);
    setIsMenuOpen(false);
  };

  return (
    <div className="group relative bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1  z-0 hover:z-10">
      
      {/* Icon Container & Menu Button */}
      <div className="flex items-start justify-between mb-4 relative">
        <div
          className={`h-12 w-12 flex items-center justify-center rounded-xl text-2xl transition-colors ${
            isDirectory ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-500"
          }`}
        >
          {isDirectory ? "📁" : "🧾"}
        </div>
        
        {/* Three Dots Button */}
        <div ref={menuRef} className="relative">
          <button 
            onClick={handleMenuToggle}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
                isMenuOpen ? "bg-gray-100 text-gray-800" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
          </button>

          {/* DROP DOWN MENU */}
          {isMenuOpen && (
            <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
              <div className="py-1">
                {/* 'Open' is available for everyone */}
                <button
                  onClick={handleOpen}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors font-medium cursor-pointer"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  Open
                </button>

                {/* 'Download' is ONLY for Files */}
                {!isDirectory && (
                  <button
                    onClick={handleDownload}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors font-medium cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* File Details */}
      <div>
        <h3 className="text-gray-800 font-semibold text-lg truncate tracking-tight group-hover:text-blue-600 transition-colors select-none">
          {file.name}
        </h3>
        <p className="text-gray-400 text-xs mt-1 font-medium tracking-wide select-none">
          {isDirectory ? "Folder" : "File"} • {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};