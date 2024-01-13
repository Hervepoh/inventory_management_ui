import { Container } from '@mui/material';
import ProductsPagination from './ProductsPagination';
import ProductsTable from './ProductsTable';
import useViewport from 'src/routes/hooks/useViewPort';
import ProductsFeed from './ProductsFeed';
import useProducts from 'src/queries/useProducts';

export default function ProductsView() {
    const { data, isLoading, page, status, setSearchParams } = useProducts();
    const { isTablet } = useViewport();

    return (
        <Container>
            <>
                {isTablet ? (
                    <ProductsTable status={status} products={data?.data} />
                ) : (
                    <ProductsFeed status={status} products={data?.data} />
                )}
            </>

            <ProductsPagination
                isLoading={isLoading}
                page={page}
                setSearchParams={setSearchParams}
                count={data?.meta.last_page}
            />
        </Container>
    );
}
