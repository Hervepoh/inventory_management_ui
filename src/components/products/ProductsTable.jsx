import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import TableLoading from './ui/TableLoading';

export default function ProductsTable({ isLoading, products }) {
    // const { data, isLoading } = useProducts();

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

            <TableBody>{isLoading ? <TableLoading /> : null}</TableBody>
        </Table>
    );
}
