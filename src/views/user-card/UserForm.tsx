import { Grid, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent } from 'react';

interface BlockTimeFormProps {
    error: string | null;
    setError: (data: string | null) => void;
    matchSm: boolean;
    name: string | undefined;
    setName: (data: string | undefined) => void;
}

const UserForm = ({ error, setError, matchSm, name, setName }: BlockTimeFormProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (error) {
            setError(null);
        }
    };

    return (
        <Grid item xs={12}>
            <Stack direction={matchSm ? 'column' : 'row'} alignItems={matchSm ? undefined : 'center'} spacing={matchSm ? 2 : 1}>
                <Typography sx={{ minWidth: '80px' }}>Name:</Typography>
                <TextField
                    fullWidth
                    // label="Title"
                    value={name || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    autoFocus
                    error={!!error}
                    variant="outlined"
                />
            </Stack>
        </Grid>
    );
};

export default UserForm;
