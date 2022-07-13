import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([{
    id: nanoid(),
    text: "Welcome",
    date:'10/7/2022'
    },]);

  /**to search about the note */
  const [searchText, setSearchText] = useState("");

  /**to dark mode */
  const [darkMode, setDarkMode] = useState(false);

  /**to get data from the local storage */
  useEffect(()=> {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data") );

    if (savedNotes){
      setNotes(savedNotes)
    } else {
      /**to save data in the local storage */
      localStorage.setItem("react-notes-app-data", JSON.stringify(notes))
    }
  }, []);

  /*to add note to the ui */
  const addNote = (text) => {
    //console.log(text);
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString() /*to replace the date to our country date format */,
    };
    const newNotes = [
      ...notes,
      newNote,
    ]; /*to add the new note to array of notes */
    setNotes(newNotes); /**to rerender the new data to the ui */
    /** save the new notes after modify it. */
    localStorage.setItem("react-notes-app-data", JSON.stringify(newNotes));
  };

  /**to delete the note */
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    /** save the new notes after modify it. */
    localStorage.setItem("react-notes-app-data", JSON.stringify(newNotes));
  };
  

  return (
    <div
      className={`${darkMode && "dark-mode"}`} /**to display the dark mode   */
    >
      <div className="container">
        <Header  handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          /** to filter the words in the noy to search */ handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
