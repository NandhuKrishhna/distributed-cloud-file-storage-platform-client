import { createPortal } from "react-dom";

export const CreateFolderModal = ({ isOpen, onClose, onSubmit, folderName, setFolderName }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
                className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Create New Folder</h3>
                </div>
                
                <form onSubmit={onSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Folder Name</label>
                            <input 
                                type="text" 
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter folder name"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 flex items-center justify-end gap-3">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
                        >
                            Create Folder
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};
