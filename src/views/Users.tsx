import { AppBar, Avatar, Button, Stack, Typography, useTheme } from '@mui/material';
import { stringToColor } from 'utils/functions';
import useAuth from '../hooks/useAuth';

const Users = () => {
    const theme = useTheme();
    const { user, logout } = useAuth();
    return (
        <Stack>
            <AppBar>
                <Stack direction="row" alignItems="center" justifyContent="space-between" maxWidth="lg">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        {user && (
                            <Avatar
                                // variant="rounded"
                                color="inherit"
                                sx={{ width: 40, height: 40, backgroundColor: stringToColor(user.email), color: '#fff' }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '20px',
                                        color: theme.palette.getContrastText(stringToColor(user.email))
                                    }}
                                >
                                    {user.email.charAt(0).toUpperCase()}
                                </Typography>
                            </Avatar>
                        )}
                        <Typography>{user?.email}</Typography>
                    </Stack>
                    <Button onClick={logout} sx={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}>
                        Logout
                    </Button>
                </Stack>
            </AppBar>
            <Typography>Users List</Typography>
        </Stack>
    );
};

export default Users;
