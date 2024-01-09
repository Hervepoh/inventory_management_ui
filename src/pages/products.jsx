import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import apiClient from 'src/utils/apiClient';

import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Switch,
  Checkbox,
  Stack,
  Typography,
  Box,
  PaginationItem,
  Pagination,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const PublishSwitch = ({ url, published }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['products'],
    mutationFn: () => apiClient.patch(`${url}/toggle-publish`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  return <Switch checked={published} disabled={isPending} onChange={() => mutate()} />;
};

/**
 * Renders a single product
 * @param {import("src/Types").Product} product
 * @returns
 */
function Product({ id, title, price, cost, stockQuantity, published, url }) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ['products'],
    mutationFn: async () => await apiClient.delete(url),
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  return (
    <TableRow>
      <TableCell>
        <Checkbox size="small" />
      </TableCell>
      <TableCell scope="row">{title}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{cost}</TableCell>
      <TableCell>{stockQuantity}</TableCell>
      <TableCell>
        <PublishSwitch published={published} url={url} />
      </TableCell>
      <TableCell className="flex items-center px-6 py-4">
        <Button variant="text" disabled={isPending} color="error" onClick={() => mutate()}>
          Delete
        </Button>
        <Link className="w-7 h-7 bg-blue-600 text-white rounded-full flex justify-center items-center ms-2" />
      </TableCell>
    </TableRow>
  );
}

const ProductsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') ?? 1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', page],
    queryFn: async () =>
      apiClient.get(`products${page ? '?page=' + page : ''}`).then((response) => response.data),
  });

  if (isLoading) return <Alert severity="info">Loading...</Alert>;

  if (isError) return <Alert severity="error">Some Error</Alert>;

  return (
    <>
      <Stack direction="row" my=".5rem">
        <Box p=".4rem .6rem" bgcolor="primary.lighter" borderRadius="4px" marginLeft="auto">
          <Typography color="primary.main">Search Results: {data?.meta.total}</Typography>
        </Box>
      </Stack>

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
          {data?.data.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </TableBody>
      </Table>

      <Stack justifyContent="center" direction="row" marginTop="0.5rem">
        <Box>
          <Pagination
            count={data?.meta.last_page}
            page={page}
            onChange={(_, value) => setSearchParams((prev) => ({ ...prev, page: value }))}
          />
        </Box>
      </Stack>
    </>
  );
};

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>
      <ProductsTable />
    </>
  );
};

export default ProductsPage;
