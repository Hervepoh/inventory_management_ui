import { Alert, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import TableLoading from '../ui/TableLoading';
import ProductRow from './ProductRow';

/**
 *
 * @param { {status: import('@tanstack/react-query').QueryStatus; products: import('src/Types').Product[]|undefined;} }
 * @returns
 */
export default function ProductsTable({ status, products }) {
    const ProductsError = (
        <TableRow>
            <TableCell colSpan={7}>
                <Alert severity="error" color="error">
                    Server Error
                </Alert>
            </TableCell>
        </TableRow>
    );

    return (
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

            <TableBody>
                {status === 'pending' ? <TableLoading /> : null}
                {status === 'error' ? ProductsError : null}
                {status === 'success' ? (
                    <>
                        {products.map((product) => (
                            <ProductRow key={product.id} {...product} />
                        ))}
                    </>
                ) : null}
            </TableBody>
        </Table>
    );
}
