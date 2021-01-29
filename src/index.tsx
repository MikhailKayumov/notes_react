import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { saveToLocalStorage } from './store/LocalStore';
import './index.scss';

store.subscribe(() => {
    saveToLocalStorage(store.getState().notes);
});

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
