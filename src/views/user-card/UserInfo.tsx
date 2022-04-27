import { Grid, Stack, Typography } from '@mui/material';
import { IUser } from '../../models/IUser';

interface UserInfoProps {
    user: IUser | null;
    matchSm: boolean;
}

const UserInfo = ({ user, matchSm }: UserInfoProps) => (
    <>
        <Grid item xs={12}>
            <Stack direction={matchSm ? 'column' : 'row'} alignItems={matchSm ? undefined : 'center'} spacing={matchSm ? 2 : 1}>
                <Typography sx={{ minWidth: '80px' }}>Name:</Typography>
                <Typography>{user?.name}</Typography>
            </Stack>
        </Grid>
        {user?.email && (
            <Grid item xs={12}>
                <Stack direction={matchSm ? 'column' : 'row'} alignItems={matchSm ? undefined : 'center'} spacing={matchSm ? 2 : 1}>
                    <Typography sx={{ minWidth: '80px' }}>Email:</Typography>
                    <Typography>{user.email}</Typography>
                </Stack>
            </Grid>
        )}
    </>
);

export default UserInfo;
