import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import apiClient from 'src/utils/apiClient';

/**
 *
 * @returns {import('@tanstack/react-query').QueryState<import('src/Types').Product>}
 */
export default function useProduct() {
    const { id } = useParams();

    return useQuery({
        queryKey: ['products', id],
        queryFn: () => apiClient.get(`products/${id}`).then(({ data }) => data),
    });
}
