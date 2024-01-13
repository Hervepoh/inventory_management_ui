import { Alert, Stack } from '@mui/material';
import ProductCard from './ProductCard';
import FeedLoading from '../ui/FeedLoading';

/**
 *
 * @param { {status: import('@tanstack/react-query').QueryStatus; products: import('src/Types').Product[]|undefined;} }
 * @returns {import('react').ReactNode}
 */
export default function ProductsFeed({ status, products }) {
    const ProductsError = (
        <Alert severity="error" color="error">
            Server Error
        </Alert>
    );

    return (
        <Stack spacing=".5rem">
            {status === 'pending' ? <FeedLoading /> : null}
            {status === 'error' ? ProductsError : null}
            {status === 'success'
                ? products?.map((product) => <ProductCard key={product.id} {...product} />)
                : null}
        </Stack>
    );
}
