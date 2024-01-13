import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@mui/material';

import apiClient from '../utils/apiClient';

/**
 *  Renders a delete icon that deletes a resource and invalidate the cache
 * @param {{ url: string; invalidate: string[] }} props
 * @returns {import('react').ReactNode}
 */
export function DeleteButton({ url, invalidate }) {
    const queryClient = useQueryClient();

    const { isPending, mutate } = useMutation({
        mutationKey: ['products'],
        mutationFn: async () => {
            const response = await apiClient.delete(url);
            if (response.status === 204) {
                await queryClient.invalidateQueries(invalidate);
            }
        },
    });

    return (
        <Button variant="text" disabled={isPending} color="error" onClick={() => mutate()}>
            Delete
        </Button>
    );
}
