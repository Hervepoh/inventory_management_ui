import { Button, Checkbox, TableCell, TableRow } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import apiClient from 'src/utils/apiClient';
import PublishSwitch from './PublishSwitch';

/**
 * Renders a single product
 * @param {import("src/Types").Product} product
 * @returns {import('react').ReactNode}
 */
export default function ProductRow({ title, price, cost, stockQuantity, published, url }) {
    const queryClient = useQueryClient();

    const { isPending, mutate } = useMutation({
        mutationKey: ['products'],
        mutationFn: async () => await apiClient.delete(url),
        onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['products'] }),
    });

    return (
        <TableRow>
            <TableCell>
                <Checkbox size="small" />
            </TableCell>
            <TableCell scope="row">{title}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>{cost}</TableCell>
            <TableCell>{stockQuantity}</TableCell>
            <TableCell>
                <PublishSwitch published={published} url={url} />
            </TableCell>
            <TableCell className="flex items-center px-6 py-4">
                <Button variant="text" disabled={isPending} color="error" onClick={() => mutate()}>
                    Delete
                </Button>
                <Link className="w-7 h-7 bg-blue-600 text-white rounded-full flex justify-center items-center ms-2" />
            </TableCell>
        </TableRow>
    );
}
