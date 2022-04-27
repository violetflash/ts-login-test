import { useFetchUsersQuery } from 'services/usersService';
import { IUser } from '../models/IUser';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    IconButton,
    List,
    ListItem,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setUsers, deleteUser } from 'store/slices/usersSlice';
import useBoolean from '../hooks/useBoolean';
import UserDialog from './user-card/UserDialog';

export const UserList = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { data, isLoading } = useFetchUsersQuery(null);
    const { users } = useAppSelector((state) => state.users);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const { value: isUserOpened, on: openUser, off: closeUser } = useBoolean();
    const { value: isInEditUserMode, on: startEditUser, off: stopEditUser } = useBoolean();

    const matchSm = useMediaQuery((themeParam: Theme) => themeParam.breakpoints.down('sm'));

    useEffect(() => {
        // reset
        if (data && !users.length) {
            dispatch(setUsers(data));
        }
    }, [data]);

    const handleDeleteUser = (id: number) => {
        dispatch(deleteUser(id));
    };

    const handleEditUser = (user: IUser) => {
        setSelectedUser(user);
    };

    const handleOpenUser = (user: IUser) => {
        setSelectedUser(user);
        openUser();
    };

    const handleCloseUserDialog = () => {
        closeUser();
        setSelectedUser(null);
        if (isInEditUserMode) {
            stopEditUser();
        }
    };

    const handleCreateUser = () => {
        openUser();
        startEditUser();
    };

    return (
        <Stack mt={2}>
            <Button startIcon={<Add />} onClick={handleCreateUser} variant="outlined" fullWidth={false}>
                Create User
            </Button>
            <List>
                {isLoading && (
                    <Box sx={{ mx: 'auto', mt: 1, width: 200 }}>
                        <CircularProgress />
                    </Box>
                )}
                {!isLoading &&
                    users &&
                    users.map((user: IUser) => (
                        <ListItem
                            key={user.id}
                            onClick={() => handleOpenUser(user)}
                            sx={{
                                justifyContent: 'space-between',
                                '&: hover': {
                                    backgroundColor: theme.palette.grey.A200
                                }
                            }}
                        >
                            <Typography>{user.name}</Typography>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <IconButton onClick={() => handleEditUser(user)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteUser(user.id)}>
                                    <Delete />
                                </IconButton>
                            </Stack>
                        </ListItem>
                    ))}
            </List>
            <Dialog
                maxWidth={matchSm ? false : 'sm'}
                fullWidth
                fullScreen={matchSm}
                onClose={handleCloseUserDialog}
                open={isUserOpened}
                sx={{ '& .MuiDialog-paper': { p: 0 } }}
            >
                {isUserOpened && (
                    <UserDialog
                        user={selectedUser}
                        closeDialog={handleCloseUserDialog}
                        matchSm={matchSm}
                        isInEditUserMode={isInEditUserMode}
                        startEditUser={startEditUser}
                        stopEditUser={stopEditUser}
                        // handleCreate={handleEventCreate}
                        // handleUpdate={handleUpdateEvent}
                    />
                )}
            </Dialog>
        </Stack>
    );
};
