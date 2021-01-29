import React, { useEffect, useRef, useState } from 'react';
import { INewNoteFormProps } from '../../interfaces';
import Button from '../UI/Button/Buttton';
import styles from './NewNoteForm.module.scss';

export const isValidName = (name: string): boolean => {
    return !!name.length && !/^[\s]+$/.test(name);
};

const NewNoteForm: React.FC<INewNoteFormProps> = ({ closeFn, addNote, isOpen }): JSX.Element => {
    const [newNoteName, setNewNoteName] = useState<string>('');
    const [inputTouched, setInputTouched] = useState<boolean>(false);

    const wrapper = useRef(null);

    const wrapClasses = [styles.NewNoteFormWrapp];
    if (isOpen) wrapClasses.push(styles.opened);

    const wrappClickHandler = (event: React.MouseEvent) => {
        (event.target === wrapper.current) && closeFn();
    };
    const keyHandler = (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        if (key === 'escape') closeFn();
        else if (key === 'enter') createNote()
    };
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTouched(true);
        setNewNoteName(event.target.value);
    };
    const createNote = () => {
        if (isValidName(newNoteName)) {
            addNote(newNoteName);
            setNewNoteName('');
            setInputTouched(false);
        }
        else {
            setInputTouched(true);
        }
    };


    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', keyHandler, true);
            return () => {
                document.removeEventListener('keydown', keyHandler, true);
            };
        }
    });

    return (
        <div className={wrapClasses.join(' ')} onClick={wrappClickHandler} ref={wrapper}>
            <div className={styles.NewNoteForm}>
                <h3>New Note</h3>
                <div className={styles.NewNoteForm__body}>
                    <input
                        className={inputTouched && !isValidName(newNoteName) ? 'invalid-input' : ''}
                        type="text"
                        onChange={inputHandler}
                        value={newNoteName}
                        placeholder="Input new note's name"
                    />
                    {
                        inputTouched && !isValidName (newNoteName)
                            ? (<div className='input-err-msg'>Name is empty or consists only of whitespace characters.</div>)
                            : null
                    }
                    <Button onClick={createNote}>Add</Button>
                </div>
            </div>
        </div>
    );
};

export default NewNoteForm;