import { IUser } from '../../models/IUser';
import { useEffect, useState } from 'react';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import UserForm from './UserForm';
import UserInfo from './UserInfo';
import { useAppDispatch } from '../../hooks/redux';
import { createNewUser, updateUser } from '../../store/slices/usersSlice';

interface EditUserDialogProps {
    user: IUser | null;
    closeDialog: () => void;
    matchSm: boolean;
    isInEditUserMode: boolean;
    startEditUser: () => void;
    stopEditUser: () => void;
}

const UserDialog = ({ user, closeDialog, matchSm, isInEditUserMode, startEditUser, stopEditUser }: EditUserDialogProps) => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const [name, setName] = useState<string | undefined>(user?.name);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = () => {
        if (!name) {
            setError('Name is required!');
            return;
        }
        if (user) {
            dispatch(updateUser({ ...user, name }));
            closeDialog();
            return;
        }
        dispatch(createNewUser({ name } as IUser));
        closeDialog();
    };

    const handleReturn = () => {
        stopEditUser();
        if (user) {
            setName(user.name);
            setError(null);
        }
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    return (
        <>
            <DialogTitle
                sx={{
                    backgroundColor: theme.palette.text.primary,
                    color: theme.palette.getContrastText(theme.palette.text.primary)
                    // padding: matchSm ? '16px 8px' : '16px 24px'
                }}
            >
                <Stack alignItems="center" justifyContent="center" direction="row" sx={{ position: 'relative' }}>
                    <Typography sx={{ color: 'inherit', fontSize: '20px' }}>{user ? 'User Info' : 'Create User'}</Typography>
                    <IconButton onClick={closeDialog} sx={{ position: 'absolute', left: 0 }}>
                        <ArrowBack sx={{ color: theme.palette.primary.contrastText }} />
                    </IconButton>
                    {!isInEditUserMode && user && (
                        <Button variant="contained" color="secondary" onClick={startEditUser} sx={{ position: 'absolute', right: 0 }}>
                            Edit
                        </Button>
                    )}
                    {isInEditUserMode && user && (
                        <Button
                            variant="text"
                            onClick={handleReturn}
                            sx={{
                                position: 'absolute',
                                right: 0,
                                color: theme.palette.primary.contrastText
                            }}
                        >
                            Return
                        </Button>
                    )}
                </Stack>
            </DialogTitle>
            <Divider />
            {/* =============== APPOINTMENT CARD CONTENT =====================  */}
            <DialogContent sx={{ p: '32px 0', backgroundColor: theme.palette.grey.A200 }}>
                <Grid container spacing={2} alignItems="center" sx={{ p: matchSm ? '0 16px' : '0 32px' }}>
                    {isInEditUserMode ? (
                        <UserForm error={error} setError={setError} matchSm={matchSm} name={name} setName={setName} />
                    ) : (
                        <UserInfo user={user} matchSm={matchSm} />
                    )}
                </Grid>
            </DialogContent>
            {isInEditUserMode && (
                <DialogActions sx={{ p: 2, backgroundColor: theme.palette.grey['300'] }}>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2} sx={{ width: '100%' }}>
                        <Button variant="contained" color="success" onClick={handleSubmit} sx={{ marginLeft: user ? undefined : 'auto' }}>
                            {user ? 'Update' : 'Create'}
                        </Button>
                    </Stack>
                </DialogActions>
            )}
        </>
    );
};

export default UserDialog;
