import { createContext, useState } from "react";
import { TRASH, NOTES } from "../../data/dummy-data";
import Note from '../../models/note';

export const TrashNoteContext = createContext({
  notes: [],
  trashNotes: [],
  addNote : (content) => {},
  searchNote: (query) => [],
  restoreNote: (id) => {},
  deleteNote: (id) => {},
  deleteNotePer: (id) => {},
  restoreAll: () => {},
  emptyTrash: () => {},
});

export function TrashNoteProvider({ children }) {
  const [trashNotes, setTrashNotes] = useState(TRASH);
  const [notesList, setNotes] = useState(NOTES);

  function addNewNote (content) {
    const newNote = new Note(Math.random().toString(), null,[],content, new Date(),null);
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function searchNote (query){
    return notesList.filter((note) => note.content.toLowerCase().includes(query.toLowerCase()));
  }

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
    notes: notesList,
    trashNotes,
    addNote : addNewNote,
    searchNote : searchNote,
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
