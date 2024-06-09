import { createContext, useState } from "react";
import { TRASH, NOTES } from "../../data/dummy-data";

export const TrashNoteContext = createContext({
  notes: [],
  trashNotes: [],
  restoreNote: (id) => {},
  deleteNote: (id) => {},
  deleteNotePer: (id) => {},
  restoreAll: () => {},
  emptyTrash: () => {},
});

export function TrashNoteProvider({ children }) {
  const [trashNotes, setTrashNotes] = useState(TRASH);
  const [notes, setNotes] = useState(NOTES);
  function restoreNoteHandler(id) {
    setTrashNotes((currentTrashNotes) => {
      const noteToRestore = currentTrashNotes.find((note) => note.id === id);
      if (noteToRestore) {
        setNotes((currentNotes) => [...currentNotes, noteToRestore]);
      }
      return currentTrashNotes.filter((note) => note.id !== id);
    });
  }

  function deleteNoteHandler(id) {
    console.log("111");
    setNotes((currentNotes) => {
      const noteToDelete = currentNotes.find((note) => note.id === id);
      if (noteToDelete) {
        setTrashNotes((currentTrashNotes) => [
          ...currentTrashNotes,
          noteToDelete,
        ]);
      }
      return currentNotes.filter((note) => note.id !== id);
    });
  }

  function deleteNotePermanentlyHandler(id) {
    setTrashNotes((currentTrashNotes) =>
      currentTrashNotes.filter((note) => note.id !== id)
    );
  }

  function restoreAllHandler() {
    setNotes((currentNotes) => [...currentNotes, ...trashNotes]);
    setTrashNotes([]);
  }

  function emptyTrashHandler() {
    setTrashNotes([]);
  }
  const value = {
    notes,
    trashNotes,
    restoreNote: restoreNoteHandler,
    deleteNote: deleteNoteHandler,
    deleteNotePer: deleteNotePermanentlyHandler,

    restoreAll: restoreAllHandler,
    emptyTrash: emptyTrashHandler,
  };
  return (
    <TrashNoteContext.Provider value={value}>
      {children}
    </TrashNoteContext.Provider>
  );
}
