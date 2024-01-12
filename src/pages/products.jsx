import {
    Alert,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Stack,
    Typography,
    Box,
    Pagination,
    Container,
    CircularProgress,
    Skeleton,
} from '@mui/material';
import ProductCard from 'src/components/products/ProductCard';
import ProductRow from 'src/components/products/ProductRow';
import useProducts from 'src/queries/useProducts';
import useViewport from 'src/routes/hooks/useViewPort';

function TableLoading() {
    return (
        <>
            {[...Array(10).keys()].map(() => (
                <TableRow>
                    <TableCell colSpan={7}>
                        <Skeleton variant="rounded" height={60} />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}

export default function ProductsTable() {
    const { data, isLoading, isError, isSuccess, page, setSearchParams } = useProducts();

    const { isTablet } = useViewport();

    const DataRender = () => {
        if (isLoading) return <TableLoading />;

        return (
            <>
                {data?.data.map((product) => (
                    <ProductRow key={product.id} {...product} />
                ))}
            </>
        );
    };

    return (
        <Container>
            <Stack direction="row" my=".5rem">
                <Box p=".4rem .6rem" bgcolor="primary.lighter" borderRadius="4px" marginLeft="auto">
                    <Typography color="primary.main">
                        {isLoading ? '' : `Search Results: ${data?.meta.total}`}
                    </Typography>
                </Box>
            </Stack>

            <>
                {isTablet ? (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell scope="col">Title</TableCell>
                                <TableCell scope="col">Price</TableCell>
                                <TableCell scope="col">Cost</TableCell>
                                <TableCell scope="col">Stock Quantity</TableCell>
                                <TableCell scope="col">Published</TableCell>
                                <TableCell scope="col">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>{DataRender()}</TableBody>
                    </Table>
                ) : (
                    <Stack spacing=".5rem">
                        {data?.data.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </Stack>
                )}

                <Stack justifyContent="center" direction="row" marginTop="0.5rem">
                    <Box>
                        <Pagination
                            count={data?.meta.last_page}
                            page={page}
                            onChange={(_, value) =>
                                setSearchParams((prev) => ({ ...prev, page: value }))
                            }
                        />
                    </Box>
                </Stack>
            </>
        </Container>
    );
}
