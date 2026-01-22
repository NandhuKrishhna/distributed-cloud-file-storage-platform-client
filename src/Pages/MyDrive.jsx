import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetAllFiles from "../hooks/useFetchAllFiles";
import { FileSkeleton } from "../components/FileSkeleton";
import { FileCard } from "../components/FileCard";

export const MyDrive = ({ prefix = "" }) => {
  const { folderName } = useParams();
  const navigate = useNavigate();
  const currentPrefix = folderName || prefix;

  console.log("Current Prefix from MyDrive:", currentPrefix);
  const { files, loading, error } = useGetAllFiles(currentPrefix);
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-xl font-bold text-gray-800">Oops, something went wrong.</h2>
        <p className="text-gray-500 mt-2">We couldn't load your files. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 sm:p-12 font-sans">
      {/* Header Section */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-2">
            {currentPrefix && (
              <button 
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
            )}
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {currentPrefix || "My Drive"}
            </h1>
          </div>
          <p className="text-gray-500 mt-1 text-sm">
            {currentPrefix ? `Contents of ${currentPrefix}` : "Manage your files and folders"}
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-600/20 transition-all text-sm">
          + New Upload
        </button>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* Loading Logic */}
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <FileSkeleton key={i} />)
          : files.map((file, index) => (
              <FileCard key={index} file={file} />
            ))}
            
      </div>
      
      {/* Empty State Logic */}
      {!loading && files && files.length === 0 && (
         <div className="col-span-full py-20 text-center">
            <p className="text-gray-400">No files found. Upload one to get started!</p>
         </div>
      )}
    </div>
  );
};