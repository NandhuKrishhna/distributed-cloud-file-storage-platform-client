import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../utils/config";
import useDownloadFile from "../hooks/useDownloadFile";
import useDeleteFiles from "../hooks/useDeleteFiles";
import useRenameFile from "../hooks/useRenameFile";

export const FileCard = ({ file , setShouldRefresh }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const isDirectory = file.type === "directory";
  const {deleteFile} = useDeleteFiles() 
  const { downloadFile } = useDownloadFile();
  const {renameFile} = useRenameFile()
  const navigate = useNavigate();
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [newName, setNewName] = useState(file.name);
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
      navigate(`/${file._id}`);
    } else {
      const fileName =`${file._id}${file.extension}`
      const fileUrl = `${CONFIG.BASE_URL}/${fileName}`
      window.open(fileUrl);
    }
    e.stopPropagation();
    setIsMenuOpen(false);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    downloadFile(`${file._id}${file.extension}`);
    setIsMenuOpen(false);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    deleteFile(file._id);
    setIsMenuOpen(false);
    setShouldRefresh(prev => !prev)
  };

  const handleRenameClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    setIsRenameModalOpen(true);
  };

  const handleRenameSubmit = async (e) => {
    e.stopPropagation();
    await renameFile(file._id, newName)
    setIsRenameModalOpen(false);
    setShouldRefresh(prev => !prev)
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
                 {!isDirectory && (
                  <button
                    onClick={handleRenameClick}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors font-medium cursor-pointer"
                  >
                   <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Rename
                  </button>
                )}
                {!isDirectory && (
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors font-medium cursor-pointer hover:text-red-500"
                  >
                    <svg className="w-4 h-4 text-gray-400 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Delete
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

      
      {/* Rename Modal */}
      {/* Rename Modal */}
      {isRenameModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Rename File</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Name</label>
                <input 
                  type="text" 
                  value={file.name} 
                  disabled 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Name</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter new name"
                  autoFocus
                />
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex items-center justify-end gap-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRenameModalOpen(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleRenameSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
              >
                Rename
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};