import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import PageTitle from '../components/PageTitle/PageTitle';
import EditNote from '../components/EditNote/EditNote';

const EditNotePage: React.FC = (): JSX.Element => {
    const { noteId } = useParams<{ noteId: string }>();

    useEffect(() => {
        document.title = "Edit Note"
    }, []);

    return (
        <>
            <PageTitle title={`Edit Note #${noteId}`}/>
            <EditNote noteId={+noteId}/>
        </>
    );
};

export default EditNotePage;