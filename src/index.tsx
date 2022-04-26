import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// mui
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';

// project imports
import App from './App';

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        desktop: true;
        tablet: true;
        mobile: true;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0, // theme.breakpoints.up('xs')
            sm: 600, // theme.breakpoints.up('sm')
            md: 992, // theme.breakpoints.up('md')
            lg: 1280, // theme.breakpoints.up('lg')
            xl: 1920, // theme.breakpoints.up('xl')
            desktop: 1280,
            tablet: 768,
            mobile: 0
        }
    }
});

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Container component="main" maxWidth="lg">
                    <CssBaseline />
                    <App />
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
