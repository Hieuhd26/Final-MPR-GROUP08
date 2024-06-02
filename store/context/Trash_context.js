import { createContext, useState } from "react";
import { TRASH } from '../../data/dummy-data';

export const TrashNoteContext = createContext({
  notes: [],
  restoreNote: (id) => {},
  deleteNote: (id) => {},
  restoreAll: () => {},
  emptyTrash: () => {},
});

export function TrashNoteProvider({ children }) {
  const [trashNotes, setTrashNotes] = useState(TRASH);
  function restoreNoteHandler(id) {
    setTrashNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
  }

  function deleteNoteHandler(id) {
    setTrashNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
  }

  function restoreAllHandler() {
    setTrashNotes([]);
  }

  function emptyTrashHandler() {
    setTrashNotes([]);
  }
  const value={
    notes: trashNotes,
    restoreNote: restoreNoteHandler,
    deleteNote: deleteNoteHandler,
    restoreAll: restoreAllHandler,
    emptyTrash: emptyTrashHandler,
  }
  return <TrashNoteContext.Provider value={value}>{children}</TrashNoteContext.Provider>;
}
