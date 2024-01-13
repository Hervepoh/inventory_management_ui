import { Switch } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from 'src/utils/apiClient';

export default function PublishSwitch({ url, published }) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['products'],
        mutationFn: () => apiClient.patch(`${url}/toggle-publish`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    });

    return (
        <Switch size="small" checked={published} disabled={isPending} onChange={() => mutate()} />
    );
}
