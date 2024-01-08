import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import apiClient from 'src/utils/apiClient';

import { Alert, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

/**
 * Renders a single product
 * @param {import("src/Types").Product} product
 * @returns
 */
function Product({ id, title, price, cost, stockQuantity, published, url }) {
  const queryClient = useQueryClient();

  const { isPending, mutate, isSuccess } = useMutation({
    mutationKey: ['products'],
    mutationFn: async () => {
      const response = await apiClient.delete(url);
    },
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  return (
    <TableRow>
      <TableCell>
        <div>
          <input id="checkbox-table-search-3" type="checkbox" />
        </div>
      </TableCell>
      <TableCell scope="row">{title}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{cost}</TableCell>
      <TableCell>{stockQuantity}</TableCell>
      <TableCell>{published}</TableCell>
      <TableCell className="flex items-center px-6 py-4">
        <Button variant="text" disabled={isPending} color="error" onClick={() => mutate()}>
          Delete
        </Button>
        <Link className="w-7 h-7 bg-blue-600 text-white rounded-full flex justify-center items-center ms-2" />
      </TableCell>
    </TableRow>
  );
}

export default function ProductsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => apiClient.get('products').then((response) => response.data),
  });

  const renderProducts = () => {
    if (isLoading) return <Alert severity="info">Loading...</Alert>;

    if (isError) return <Alert severity="error">Some Error</Alert>;

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
          {data?.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>
      {renderProducts()}
    </>
  );
}
