import React, { useEffect } from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import NotesList from '../components/NotesList/NotesList';

const NotesListPage: React.FC = (): JSX.Element => {
    useEffect(() => {
        document.title = "Notes List"
    }, []);

    return (
        <>
            <PageTitle title={'Notes List'}/>
            <NotesList />
        </>
    );
};

export default NotesListPage;