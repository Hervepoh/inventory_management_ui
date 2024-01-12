import { MoreHorizRounded } from '@mui/icons-material';
import { Box, ClickAwayListener, IconButton } from '@mui/material';
import { useState } from 'react';

export default function OptionsMenu({ children }) {
    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen((prev) => !prev);

    const handleClickAway = () => setOpen(false);

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative' }}>
                <IconButton onClick={handleClick}>
                    <MoreHorizRounded />
                </IconButton>
                {open ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 0,
                            bgcolor: '#f2f2f2',
                            borderRadius: '0.2rem',
                        }}
                    >
                        {children}
                    </Box>
                ) : null}
            </Box>
        </ClickAwayListener>
    );
}
