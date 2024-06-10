import { createContext, useState } from "react";
import { TRASH, NOTES, FOLDERS } from "../../data/dummy-data";
import Folder from "../../models/folder";

export const FolderContext = createContext({
  folders: [],
  addFolder: (name) => {},
  deleteFolder: (id) => {},
  updateFolder: (id, name) => {},
});

export function FolderProvider({ children }) {
  const [folders, setFolders] = useState(FOLDERS);

  function addFolderHandler(name) {
    const newFolder = new Folder(Math.random().toString(), name);
    setFolders((currentFolders) => [...currentFolders, newFolder]);
  }
  function deleteFolderHandler(id) {
    setFolders((currentFolders) =>
      currentFolders.filter((folder) => folder.id !== id)
    );
  }
  function updateFolderHandler(id, newName) {
    setFolders((currentFolders) =>
      currentFolders.map((folder) =>
        folder.id === id ? { ...folder, name: newName } : folder
      )
    );
  }
  const value = {
    folders,
    addFolder: addFolderHandler,
    deleteFolder: deleteFolderHandler,
    updateFolder: updateFolderHandler,
  };
  return (
    <FolderContext.Provider value={value}>
      {children}
    </FolderContext.Provider>
  );

}
