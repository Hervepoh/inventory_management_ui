import { Container } from '@mui/material';
import ProductsPagination from './ProductsPagination';
import ProductsTable from './ProductsTable';
import useViewport from 'src/routes/hooks/useViewPort';
import ProductsFeed from './ProductsFeed';
import useProducts from 'src/queries/useProducts';
import ProductsFilter from './ProductsFilter';

export default function ProductsView() {
    const { data, isLoading, page, setSearchParams } = useProducts();
    const { isTablet } = useViewport();

    return (
        <Container>
            <>
                {isTablet ? (
                    <ProductsTable isLoading={isLoading} products={data} />
                ) : (
                    <ProductsFeed isLoading={isLoading} products={data} />
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
