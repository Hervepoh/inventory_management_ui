import { Container } from '@mui/material';
import ProductsPagination from './ProductsPagination';
import ProductsTable from './ProductsTable';
import useViewport from 'src/routes/hooks/useViewPort';
import ProductsFeed from './ProductsFeed';
import useProducts from 'src/hooks/queries/useProducts';

export default function ProductsView() {
    const { data, isLoading, page, status, setSearchParams } = useProducts();
    const { isMobile } = useViewport();

    return (
        <Container>
            <>
                {isMobile ? (
                    <ProductsFeed status={status} products={data?.data} />
                ) : (
                    <ProductsTable status={status} products={data?.data} />
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
