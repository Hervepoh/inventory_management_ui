import { Box, Pagination, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

export default function ProductsPagination({ isLoading, count, page, setSearchParams }) {
    return (
        <Stack justifyContent="center" direction="row" marginTop="0.5rem">
            {isLoading ? (
                'loading...'
            ) : (
                <Box>
                    <Pagination
                        count={count}
                        page={page}
                        onChange={(_, value) =>
                            setSearchParams((prev) => ({ ...prev, page: value }))
                        }
                    />
                </Box>
            )}
        </Stack>
    );
}
