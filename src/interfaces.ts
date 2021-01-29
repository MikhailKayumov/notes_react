import React from 'react';

export interface IUIButtonProps {
    classType?: string;
    disabled?: boolean;
    onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface INote {
    id: number;
    title: string;
    tasks: INoteTask[];
}
export interface INoteTask {
    id: number;
    title: string;
    done: boolean;
}

export interface ITaskListProps {
    tasks: INoteTask[];
    isEdit?: boolean;
    addTask?: (note: INoteTask) => void;
    editTask?: (id: number, newData: INoteTask) => void;
    delTask?: (id: number) => void;
}
export interface ITaskProps {
    task: INoteTask;
    isEdit?: boolean;
    delTask?: (id: number) => void;
    editTask?: (id: number, newData: INoteTask) => void;
}

export interface INewNoteFormProps {
    closeFn: () => void;
    addNote: (title: string) => void;
    isOpen: boolean;
}