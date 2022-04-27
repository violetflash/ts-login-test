import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// project imports
import App from './App';
import { store } from './store';

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        desktop: true;
        tablet: true;
        mobile: true;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
