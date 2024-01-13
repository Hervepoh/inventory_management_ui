import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import apiClient from 'src/utils/apiClient';

export default function useProducts() {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page') ?? 1);

    const query = useQuery({
        queryKey: ['products', page],
        queryFn: async () =>
            apiClient
                .get(`products${page ? '?page=' + page : ''}`)
                .then((response) => response.data),
    });

    return {
        page,
        setSearchParams,
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        isSuccess: query.isSuccess,
        status: query.status,
    };
}
