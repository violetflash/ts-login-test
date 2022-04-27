import { FormHelperText, Grid, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useRef } from 'react';

interface BlockTimeFormProps {
    error: string | null;
    setError: (data: string | null) => void;
    matchSm: boolean;
    name: string | undefined;
    setName: (data: string | undefined) => void;
}

const UserForm = ({ error, setError, matchSm, name, setName }: BlockTimeFormProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (error) {
            setError(null);
        }
    };

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, []);

    return (
        <Grid item xs={12}>
            <Stack direction={matchSm ? 'column' : 'row'} alignItems={matchSm ? undefined : 'center'} spacing={matchSm ? 2 : 1}>
                <Typography sx={{ minWidth: '80px' }}>Name:</Typography>
                <Stack sx={{ width: '100%', position: 'relative' }}>
                    <TextField
                        ref={ref}
                        fullWidth
                        placeholder="Name"
                        value={name || ''}
                        onChange={handleChange}
                        autoComplete="off"
                        autoFocus
                        error={!!error}
                        variant="outlined"
                    />
                    {error && (
                        <FormHelperText error id="login-form-helper-text" sx={{ position: 'absolute', bottom: '-24px' }}>
                            {error}
                        </FormHelperText>
                    )}
                </Stack>
            </Stack>
        </Grid>
    );
};

export default UserForm;
