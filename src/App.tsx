import Routes from 'routes';

// mui
import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project imports
import { AuthProvider } from './contexts/AuthContext';

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

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
            <Container component="main" maxWidth="lg">
                <Routes />
            </Container>
        </AuthProvider>
    </ThemeProvider>
);
export default App;
