import { Button, Stack, Typography } from '@mui/material';
import AuthWrapper from '../ui-components/AuthWrapper';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Title = styled(Typography)`
    text-align: right;
    flex: 0 0 50%;
`;

const Description = styled(Typography)`
    text-align: left;
    flex: 0 0 50%;
`;

const ForgotPassword = () => {
    return (
        <AuthWrapper>
            <>
                <Stack alignItems="center">
                    <Title>login:</Title>
                    <Description>user12345</Description>
                </Stack>
                <Stack alignItems="center" sx={{ mt: 2 }}>
                    <Title>password:</Title>
                    <Description>12345</Description>
                </Stack>
                <Button variant="text" size="small" component={Link} to="/login" sx={{ mx: 'auto', mt: 2 }}>
                    Back to Login page
                </Button>
            </>
        </AuthWrapper>
    );
};

export default ForgotPassword;
