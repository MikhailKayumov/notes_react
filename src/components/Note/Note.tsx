import React from 'react';
import { INote } from '../../interfaces';
import { Link } from 'react-router-dom';
import TaskList from '../TaskList/TaskList';
import styles from './Note.module.scss';

const Note: React.FC<{ note: INote }> = ({ note }): JSX.Element => {
    return (
        <div className={[styles.Note, 'container'].join(' ')}>
            <div className={styles.Note__header}>
                <h3>{note.title}</h3>
                <Link to={`/note/${note.id}`}>Edit</Link>
            </div>
            <div className={styles.Note__body}>
                <TaskList tasks={note.tasks} />
            </div>
        </div>
    );
};

export default Note;