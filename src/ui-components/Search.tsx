import { InputAdornment, TextField, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import { SearchTwoTone } from '@mui/icons-material';
import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch } from '../hooks/redux';
import { setSearchTerm } from '../store/slices/usersSlice';

export const Search = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');

    const debouncedHandleOnChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(event.target.value));
    }, 300);

    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setValue(newValue);
        debouncedHandleOnChange(event);
    }, []);

    return (
        <TextField
            label="Search"
            value={value}
            onChange={handleOnChange}
            autoComplete="off"
            size="small"
            sx={{
                maxWidth: '300px',
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.background.paper,
                borderRadius: '4px'
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchTwoTone />
                    </InputAdornment>
                )
            }}
        />
    );
};
