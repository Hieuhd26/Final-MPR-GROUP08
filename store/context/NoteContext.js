import { createContext, useState } from "react";
import { TRASH, NOTES } from "../../data/dummy-data";
import Note from '../../models/note';


export const TrashNoteContext = createContext({
  notes: [],
  trashNotes: [],
  addNote : (content) => {},
  updateNote: (id, content) => {},
  addNewLabel : (note_id,label_id) => {},
  removeLabel : (note_id,label_id) => {},
  updateColor: (id, color) => {},
  searchNote: (query) => [],
  addBookmark : (id) => {},
  removeBookmark : (id) => {},
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
    const newNote = new Note(Math.random().toString(), null,[],content, new Date(),null,null);
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }
  
  function addNewLabel (note_id,label_id){
    const oldLabels = notesList.filter((note) => {
      if (note.id === note_id){
        return (note)
      }})
    const labelArray = oldLabels[0].labelIds;
    labelArray.push(label_id);
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === note_id ? { ...note, labelIds: labelArray } : note))
    );
  }

  function removeLabel (note_id,label_id){
    const oldLabels = notesList.filter((note) => {
      if (note.id === note_id){
        return (note)
      }})
    const labelArray = oldLabels[0].labelIds;
    const filteredItems =labelArray.filter(item => item !== label_id)
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === note_id ? { ...note, labelIds: filteredItems } : note))
    );
  }

  function updateColor(id, color) {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, color: color } : note))
    );
  }
  function updateNote(id, content) {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, content: content } : note))
    );
  }
  function addBookmark(id) {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, isBookmarked: true } : note))
    );
  }
  function removeBookmark(id) {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, isBookmarked: false } : note))
    );
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
    trashNotes:trashNotes,
    addNote : addNewNote,
    updateNote : updateNote,
    removeLabel:removeLabel,
    updateColor : updateColor,
    addNewLabel : addNewLabel,
    addBookmark: addBookmark,
    removeBookmark: removeBookmark,
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
