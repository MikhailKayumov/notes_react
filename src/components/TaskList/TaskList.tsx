import React, { useState } from 'react';
import { ITaskListProps } from '../../interfaces';
import { isValidName } from '../NewNoteForm/NewNoteForm';
import Task from '../Task/Task';
import Button from '../UI/Button/Buttton';
import styles from './TaskList.module.scss';

const TaskList: React.FC<ITaskListProps> = (props): JSX.Element => {
    const { tasks, isEdit = false, addTask, delTask, editTask } = props;

    const [newTaskName, setNewTaskName] = useState<string>('');
    const [touchedNewTaskNameField, setTouchedNewTaskNameField] = useState<boolean>(false);

    const addTaskHandler = () => {
        if (isValidName(newTaskName) && addTask) {
            addTask({
                id: Date.now(),
                title: newTaskName.trim(),
                done: false
            });

            setNewTaskName('');
            setTouchedNewTaskNameField(false);
        }
        else {
            setTouchedNewTaskNameField(true);
        }
    };

    return (
        <>
            {
                isEdit ? (
                    <div className={styles['TaskList__add-task-box']}>
                        <input
                            className={touchedNewTaskNameField && !isValidName(newTaskName) ? 'invalid-input' : ''}
                            type="text" placeholder='Input new task'
                            onChange={event => {
                                setNewTaskName(event.target.value);
                                setTouchedNewTaskNameField(true);
                            }}
                            value={newTaskName}
                        />
                        {
                            touchedNewTaskNameField && !isValidName(newTaskName)
                                ? (<div className='input-err-msg'>Name is empty or consists only of whitespace characters.</div>)
                                : null
                        }
                        <Button onClick={addTaskHandler}>Add task</Button>
                    </div>
                ) : null
            }
            <div className={styles.TaskList}>
                {
                    tasks.length
                        ? tasks.map((task, id) => {
                            return (
                                <Task
                                    task={task}
                                    isEdit={isEdit}
                                    key={id}
                                    delTask={delTask}
                                    editTask={editTask}
                                />
                            );
                        })
                        : (<div className={styles['empty-list']}>Task list is empty</div>)
                }
            </div>
        </>
    );
};

export default TaskList;