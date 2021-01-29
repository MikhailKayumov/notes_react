import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INote } from '../interfaces';
import { loadFromLocalStorage } from './LocalStore';

export const noteSlice = createSlice({
    name: 'notes',
    initialState: loadFromLocalStorage(),
    reducers: {
        addNote: (state, action: PayloadAction<INote>) => {
            state.push(action.payload);
        },
        changeNote: (state, action: PayloadAction<{ id: number, newNote: INote }>) => {
            const { newNote, id } = action.payload;
            const noteNumber = state.findIndex((el: INote) => el.id === id);
            state.splice(noteNumber, 1, newNote);
        },
        delNote: (state, action: PayloadAction<number>) => {
            const noteNumber = state.findIndex((el: INote) => el.id === action.payload);
            state.splice(noteNumber, 1);
        },
    }
});

export const { addNote, delNote, changeNote } = noteSlice.actions;

export const selectNotes = (state: { notes: INote[] }) => state.notes;

export default noteSlice.reducer;