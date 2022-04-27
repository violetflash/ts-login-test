import { useState } from 'react';
import { Link } from 'react-router-dom';

// mui
import { Avatar, Box, Button, Checkbox, FormControlLabel, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

// project imports
import AuthWrapper from '../ui-components/AuthWrapper';
import useBoolean from '../hooks/useBoolean';
import useAuth from '../hooks/useAuth';
import useToggle from '../hooks/useToggle';

const Login = () => {
    const { login } = useAuth();
    const { value: isSubmitting, on: startSubmitting, off: cancelSubmitting } = useBoolean();
    const [error, setError] = useState<string | null>(null);
    const [save, toggle] = useToggle(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        if (!email) {
            setError('Email is Required');
            return;
        }
        if (!password) {
            setError('Password is Required');
            return;
        }

        startSubmitting();

        login({ email, password, remember: save })
            .then(() => {
                console.log('success');
            })
            .catch(() => {
                setError('The provided credentials are invalid');
                cancelSubmitting();
            });
    };

    console.log(save);

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
                    <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoFocus />
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" />
                    {error && (
                        <FormHelperText error id="login-form-helper-text">
                            {error}
                        </FormHelperText>
                    )}
                    <FormControlLabel
                        control={<Checkbox name="remember" value={save} onChange={(e) => toggle(e.target.checked)} color="primary" />}
                        label="Remember me"
                    />
                    <LoadingButton loading={isSubmitting} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </LoadingButton>
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
