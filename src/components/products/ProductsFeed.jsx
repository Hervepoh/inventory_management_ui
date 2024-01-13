import { Stack } from '@mui/material';
import ProductCard from './ProductCard';

export default function ProductsFeed() {
    return (
        <Stack spacing=".5rem">
            {data?.data.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </Stack>
    );
}
