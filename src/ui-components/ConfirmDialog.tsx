import { Box, Button, IconButton, Modal, Stack, Typography, useTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { closeConfirmDialog } from '../store/slices/confirmDialogSlice';
import { Close } from '@mui/icons-material';

const ConfirmDialog = () => {
    const {
        confirmData: { onClose, onConfirm, confirmText, text },
        isOpened
    } = useAppSelector((state) => state.confirmDialog);
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const handleCloseConfirm = () => {
        dispatch(closeConfirmDialog());
    };

    const closeFunc = onClose || handleCloseConfirm;

    const handleConfirm = () => {
        closeFunc();
        if (onConfirm) {
            onConfirm();
        }
    };

    return (
        <Modal open={isOpened} onClose={closeFunc} aria-labelledby="confirm-modal-title" aria-describedby="confirm-modal-description">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#ffffff',
                    border: '1px solid #90caf975',
                    boxShadow: 10,
                    borderRadius: '12px'
                }}
            >
                <Stack direction="row" justifyContent="flex-end" sx={{ padding: '5px' }}>
                    <IconButton size="small" aria-label="close" color="primary" onClick={closeFunc}>
                        <Close fontSize="small" />
                    </IconButton>
                </Stack>
                <Stack sx={{ p: 4, pt: 2 }}>
                    <Typography
                        sx={{ textAlign: 'center', pb: 2 }}
                        variant="subtitle1"
                        gutterBottom
                        component="div"
                        id="modal-modal-description"
                    >
                        {text}
                    </Typography>
                    <Stack direction="row" justifyContent="center" spacing={4}>
                        {onConfirm && confirmText && (
                            <Button variant="contained" color="primary" size="small" onClick={handleConfirm}>
                                {confirmText}
                            </Button>
                        )}
                        <Button
                            variant={onConfirm ? 'outlined' : 'contained'}
                            onClick={closeFunc}
                            // autoFocus
                            sx={{ color: onConfirm ? theme.palette.error.dark : undefined }}
                        >
                            {onConfirm ? 'Cancel' : 'Ok'}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
};

export default ConfirmDialog;
