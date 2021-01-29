import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotes, addNote as sAddNote } from '../../store/noteSlice';
import Note from '../Note/Note';
import Button from '../UI/Button/Buttton';
import NewNoteForm from '../NewNoteForm/NewNoteForm';
import styles from './NotesList.module.scss';

const NotesList: React.FC = (): JSX.Element => {
    const notes = useSelector(selectNotes)
    const dispatch = useDispatch();

    const [newNoteFormOpen, setNewNoteFormOpen] = useState<boolean>(false);

    const closeNewNoteForm = () => {
        setNewNoteFormOpen(false);
    };
    const addNote = (title: string) => {
        dispatch(sAddNote({
            id: Date.now(),
            title: title.trim(),
            tasks: []
        }));
        setNewNoteFormOpen(false);
    };

    return (
        <div className={styles.NotesList}>
            <div className={`container ${styles['NotesList__open-new-note-form-btn-wrapp']}`}>
                <Button onClick={() => setNewNoteFormOpen(true)}>New note</Button>
            </div>
            {
                notes.length
                    ? notes.map(note => <Note note={note} key={note.id}/>)
                    : (<div className={`container ${styles['NotesList__no-notes']}`}>List of notes is empty</div>)
            }
            <NewNoteForm addNote={addNote} closeFn={closeNewNoteForm} isOpen={newNoteFormOpen} />
        </div>
    );
};

export default NotesList;