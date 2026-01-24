
import { useParams, useNavigate } from "react-router-dom";
import useGetAllFiles from "../hooks/useFetchAllFiles";
import useCreateFolderMutation from "../hooks/useCreateFolder";
import { FileSkeleton } from "../components/FileSkeleton";
import { FileCard } from "../components/FileCard";
import { CreateFolderModal } from "../components/CreateFolderModal";
import { useState } from "react";
import { CONFIG } from "../utils/config";

export const MyDrive = ({ prefix = "" }) => {
  const [progess , setProgress] = useState(0)
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const params = useParams();
  const folderPath = params["*"];
  const navigate = useNavigate();
  const currentPrefix = folderPath || prefix;
  const { files, loading, error } = useGetAllFiles(currentPrefix, shouldRefresh);
  const { createFolder } = useCreateFolderMutation();
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!newFolderName) return;
    await createFolder(currentPrefix, newFolderName);
    setIsFolderModalOpen(false);
    setNewFolderName("");
    setShouldRefresh(prev => !prev);
  }

  const handleBack = () => {
    const parts = currentPrefix.split('/');
    parts.pop();
    const parent = parts.join('/');
    navigate(parent ? `/drive/${parent}` : '/');
  };

  const handleUploadFile = (e) => {
    const file = e.target.files[0]
     const xhr = new XMLHttpRequest()
   xhr.open("POST",`${CONFIG.BASE_URL}/files/upload?folder=${currentPrefix}&fileName=${file.name}`, true)
   xhr.upload.addEventListener("progress",(event)=>{
        const percentComplete = (event.loaded / event.total) * 100
        setProgress(percentComplete.toFixed(2))

   })
   xhr.onload = () => {
        if(xhr.status === 201){
            console.log("Upload success")
            setProgress(0)
            setShouldRefresh(prev => !prev)
        }
    }
   xhr.send(file)
  }
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
                onClick={handleBack}
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
        
        <div className="flex gap-3">
            <button 
                onClick={() => setIsFolderModalOpen(true)}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all text-sm cursor-pointer flex items-center gap-2"
            >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                New Folder
            </button>
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-600/20 transition-all text-sm cursor-pointer inline-block flex items-center justify-center">
    
                {/* The actual text goes here, inside the label, NOT the input */}
                <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    {progess > 0 ? `Uploading... ${progess}%` : "Upload File"}
                </span>
                
                {/* The input is hidden, but still functional */}
                <input 
                    type="file" 
                    onChange={handleUploadFile} 
                    className="hidden" 
                />
                
            </label>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        

        {loading
          ? Array.from({ length: 8 }).map((_, i) => <FileSkeleton key={i} />)
          : files.map((file, index) => (
              <FileCard key={index} file={file} setShouldRefresh={setShouldRefresh}/>
            ))}
            
      </div>
      {!loading && files && files.length === 0 && (
         <div className="col-span-full py-20 text-center">
            <p className="text-gray-400">No files found. Upload one to get started!</p>
         </div>
      )}

      <CreateFolderModal 
        isOpen={isFolderModalOpen} 
        onClose={() => setIsFolderModalOpen(false)} 
        onSubmit={handleCreateFolder}
        folderName={newFolderName} 
        setFolderName={setNewFolderName}
      />
    </div>
  );
};

