import { AppBar, Avatar, Button, Stack, styled, Toolbar, Typography, useTheme } from '@mui/material';
import { stringToColor } from 'utils/functions';
import useAuth from '../hooks/useAuth';
import { UserList } from './UserList';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const MainPage = () => {
    const theme = useTheme();
    const { user, logout } = useAuth();
    return (
        <>
            <AppBar>
                <Toolbar sx={{ maxWidth: '1280px', width: '100%', mx: 'auto' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
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
                        <Button
                            onClick={logout}
                            variant="outlined"
                            sx={{
                                color: theme.palette.getContrastText(theme.palette.primary.main),
                                borderColor: theme.palette.getContrastText(theme.palette.primary.main),
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                    borderColor: theme.palette.getContrastText(theme.palette.primary.main)
                                }
                            }}
                        >
                            Logout
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Offset />
            <UserList />
        </>
    );
};

export default MainPage;
