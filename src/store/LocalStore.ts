import { INote } from '../interfaces';

export const saveToLocalStorage = (state: INote[]) => {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem('notes', serialisedState);
    }
    catch (e) {
        console.warn(e);
    }
}

export const loadFromLocalStorage = () => {
    try {
        const serialisedState = localStorage.getItem('notes');
        if (serialisedState === null) return [];
        return JSON.parse(serialisedState);
    }
    catch (e) {
        console.warn(e);
        return [];
    }
}