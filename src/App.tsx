import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EditNotePage from './pages/EditNotePage';
import NotesListPage from './pages/NotesListPage';

const App: React.FC = (): JSX.Element => {
    return (
        <main>
            <Switch>
                <Route path="/note/:noteId" component={EditNotePage}/>
                <Route path="/" component={NotesListPage}/>
            </Switch>
        </main>
    );
}

export default App;
