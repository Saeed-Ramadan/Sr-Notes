import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
    const[noteText , setNoteText] = useState('');
    const characterLimit = 500;

    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0){
            setNoteText(event.target.value);
        }
    }

    const handleSaveClick = () => {
        if(noteText.trim().length > 0){
            handleAddNote(noteText);
            setNoteText('');
        } /**to check if there a character in the note or not if there is not < don not save < and back the new empty note empty */
    }
    return (
        <div className="note new">
            <textarea
                rows='8'
                cols='10'
                placeholder="Type to add a note..."
                value={noteText}
                onChange={handleChange}
            ></textarea>
            <div className="note-footer">
                <small>{characterLimit - noteText.length} Remaing</small>
                <button className="save" onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    )
}

export default AddNote;
