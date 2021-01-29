import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { changeNote, delNote, selectNotes } from '../../store/noteSlice';
import { isValidName } from '../NewNoteForm/NewNoteForm';
import { INote, INoteTask } from '../../interfaces';
import Button from '../UI/Button/Buttton';
import TaskList from '../TaskList/TaskList';
import styles from './EditNote.module.scss';

const EditNote: React.FC<{ noteId: number }> = ({ noteId }): JSX.Element => {
    const history = useHistory();
    const dispatch = useDispatch();
    const notes = useSelector(selectNotes);
    const note: INote = notes.find(note => note.id === noteId) as INote || {};

    const [newName, setNewName] = useState<string>(note.title || '');
    const [tasks, setTasks] = useState<INoteTask[]>([...note.tasks]);
    const [confirmDeleting, setConfirmDeleting] = useState<boolean>(false);

    const saveNote = () => {
        dispatch(changeNote({
            id: noteId,
            newNote: {
                title: newName,
                id: noteId,
                tasks
            }
        }));
        history.push('/');
    };
    const deleteNote = () => {
        dispatch(delNote(noteId));
        history.push('/');
    };

    const addTask = (task: INoteTask) => {
        setTasks(prevState => [...prevState, task]);
    }
    const delTask = (id: number) => {
        const taskNum = tasks.findIndex(el => id === el.id);
        setTasks(prevState => {
            const arr = [...prevState];
            arr.splice(taskNum, 1);
            return [...arr];
        });
    }
    const editTask = (id: number, newData: INoteTask) => {
        const taskNum = tasks.findIndex(el => id === el.id);
        setTasks(prevState => {
            const arr = [...prevState];
            arr.splice(taskNum, 1, newData);
            return [...arr];
        });
    }

    if (!note.title) {
        return (
            <div className={`container ${styles['edit-note-not-found']}`}>
                <div>Note is not found.</div>
                <Button onClick={() => history.push('/')}>Back</Button>
            </div>
        );
    }

    return (
        <>
            <div className={`container ${styles['edit-note-title']}`}>
                <div>Note title</div>
                <input
                    className={!isValidName(newName) ? 'invalid-input' : ''}
                    type="text"
                    value={newName}
                    onChange={ev => setNewName(ev.target.value)}
                />
                {
                    !isValidName(newName)
                        ? (<div className='input-err-msg'>Name is empty or consists only of whitespace characters.</div>)
                        : null
                }
            </div>
            {
                confirmDeleting
                    ? (<div className={styles['confirm-deleting-wrapp']}>
                        <div className={styles['confirm-deleting-win']}>
                            <div>Attention!</div>
                            <div>Are you really want to delete this note?</div>
                            <div>
                                <Button onClick={() => { setConfirmDeleting(false); }} classType='error'>No</Button>
                                <Button onClick={deleteNote} classType='success'>Yes</Button>
                            </div>
                        </div>
                    </div>)
                    : null
            }
            <div className={`container ${styles['edit-note-tasks']}`}>
                <h3>Tasks</h3>
                <TaskList
                    tasks={tasks}
                    isEdit={true}
                    addTask={addTask}
                    delTask={delTask}
                    editTask={editTask}
                />
            </div>
            <div className={styles['edit-bottom-btns']}>
                <div>
                    <Button onClick={() => { setConfirmDeleting(true); }} classType='error'>Delete</Button>
                </div>
                <div>
                    <Button onClick={() => { history.push('/'); }}>Cancel</Button>
                    <Button onClick={saveNote} classType='success'>Save</Button>
                </div>
            </div>
        </>
    );
}

export default EditNote;
