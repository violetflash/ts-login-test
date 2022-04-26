import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AuthWrapper from '../ui-components/AuthWrapper';

const Login = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password')
        });
    };

    return (
        <AuthWrapper>
            <>
                <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                    />
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Button variant="text" size="small" component={Link} to="/forgot-password">
                                Forgot password?
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </>
        </AuthWrapper>
    );
};

export default Login;
