import React, { useEffect, useState } from 'react';

// mui
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

// project-imports
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import useBoolean from '../hooks/useBoolean';
import { openConfirmDialog } from '../store/slices/confirmDialogSlice';
import { setUsers, deleteUser } from 'store/slices/usersSlice';
import { LS_USERS_KEY } from '../store/constants';
import { useFetchUsersQuery } from 'services/usersService';
import { IUser } from '../models/IUser';
import { getDataFromLS } from '../utils/functions';
import NavMotion from '../ui-components/animations/NavMotion';
import UserDialog from './user-card/UserDialog';
import { Search } from '../ui-components/Search';

export const UserList = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const [skip, setSkip] = useState(true);
    const { users, searchTerm } = useAppSelector((state) => state.users);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const { value: isUserOpened, on: openUser, off: closeUser } = useBoolean();
    const { value: isInEditUserMode, on: startEditUser, off: stopEditUser } = useBoolean();
    const { data, isLoading } = useFetchUsersQuery(null, { skip });

    const matchSm = useMediaQuery((themeParam: Theme) => themeParam.breakpoints.down('sm'));

    useEffect(() => {
        const usersFromLS = getDataFromLS(LS_USERS_KEY);
        if (usersFromLS && usersFromLS.length > 0) {
            dispatch(setUsers(usersFromLS));
            return;
        }
        setSkip(false);
    }, []);
    useEffect(() => {
        // reset
        if (data) {
            dispatch(setUsers(data));
        }
    }, [data]);

    const handleDeleteUser = (id: IUser['id']) => {
        dispatch(deleteUser(id));
    };

    const handleOpenUser = (user: IUser) => {
        setSelectedUser(user);
        openUser();
    };

    const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>, user: IUser) => {
        e.stopPropagation();
        dispatch(
            openConfirmDialog({
                onConfirm: () => handleDeleteUser(user.id),
                confirmText: `Delete`,
                text: `Are you sure you want to delete ${user.name} ?`
            })
        );
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
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3} spacing={2}>
                <Search />
                <Button startIcon={<Add />} onClick={handleCreateUser} variant="outlined" fullWidth={false} sx={{ minHeight: '40px' }}>
                    User
                </Button>
            </Stack>
            <Divider />
            <List sx={{ '& > div:last-of-type > li': { border: 'none' }, pt: 0 }}>
                {isLoading && (
                    <Box sx={{ mx: 'auto', mt: 1, width: 200 }}>
                        <CircularProgress />
                    </Box>
                )}
                {!isLoading &&
                    users &&
                    users
                        .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((user, index: number) => (
                            <NavMotion key={user.id}>
                                <ListItem
                                    onClick={() => handleOpenUser(user)}
                                    sx={{
                                        cursor: 'pointer',
                                        justifyContent: 'space-between',
                                        '&: hover': {
                                            backgroundColor: theme.palette.grey.A200
                                        },
                                        borderBottom: '1px solid',
                                        borderColor: theme.palette.grey.A400
                                    }}
                                >
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Typography>{index + 1})</Typography>
                                        <Typography>{user.name}</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <IconButton onClick={(e) => confirmDelete(e, user)}>
                                            <Delete />
                                        </IconButton>
                                    </Stack>
                                </ListItem>
                            </NavMotion>
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
