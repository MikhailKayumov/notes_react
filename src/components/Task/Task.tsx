import React, { useRef } from 'react';
import { ITaskProps } from '../../interfaces';
import Button from '../UI/Button/Buttton';
import styles from './Task.module.scss';

const Task: React.FC<ITaskProps> = (props): JSX.Element => {
    const { task, isEdit = false, delTask, editTask } = props;

    const doneField = useRef<HTMLInputElement>(null);
    const titleField = useRef<HTMLInputElement>(null);

    const removeTask = () => {
        if (!delTask) return;
        delTask(task.id);
    };
    const changeTask = () => {
        if (!editTask) return;
        editTask(task.id, {
            id: task.id,
            done: doneField.current!.checked,
            title: titleField.current!.value.trim()
        });
    };

    const classes = [styles.Task];
    if (isEdit) classes.push(styles['edit-mode']);
    if (task.done) classes.push(styles['done']);

    return (
        <div className={classes.join(' ')}>
            <div className={styles['Task__left-cell']}>
                <input
                    type="checkbox"
                    disabled={!isEdit}
                    checked={task.done}
                    onChange={changeTask}
                    ref={doneField}
                />
                {
                    isEdit
                        ? <input
                            className={styles['Task__title-field']}
                            type="text"
                            value={task.title}
                            onChange={changeTask}
                            ref={titleField}
                            disabled={task.done}
                        />
                        : <div className={styles.Task__title}>{task.title}</div>
                }
            </div>
            {
                isEdit ? (
                    <div className={styles['Task__right-cell']}>
                        <Button onClick={removeTask} classType='error'>Delete</Button>
                    </div>
                ) : null
            }
        </div>
    );
};

export default Task;