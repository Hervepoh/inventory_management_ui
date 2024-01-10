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
  useTheme,
  Card,
  CardContent,
  Container,
  CardActions,
  CardHeader,
} from '@mui/material';
import useProducts from 'src/queries/useProducts';
import React, { useEffect, useState } from 'react';

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
 * @returns {import('react').ReactNode}
 */
const ProductRow = ({ id, title, price, cost, stockQuantity, published, url }) => {
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
};

/**
 * Renders a single product
 * @param {import("src/Types").Product} product
 * @returns
 */
const ProductCard = ({ id, title, price, cost, stockQuantity, published, url }) => {
  return (
    <Card variant="outlined">
      <CardActions>
        <PublishSwitch published={published}></PublishSwitch>
      </CardActions>

      <CardContent>
        <Typography>{title}</Typography>
        <Typography fontWeight="bold">Price: {price}</Typography>
        <Typography fontWeight="bold">Cost: {cost}</Typography>
        <Typography fontWeight="bold">Stock Quantity: {stockQuantity}</Typography>
      </CardContent>
    </Card>
  );
};

const ProductsTable = () => {
  const { data, isLoading, isError, page } = useProducts();

  const tabletBreakPoint = useTheme().breakpoints.values.sm;

  const [isTablet, setIsTablet] = useState(window.innerWidth >= tabletBreakPoint);

  useEffect(() => {
    const handleResize = (ev) => setIsTablet(window.innerWidth >= tabletBreakPoint);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) return <Alert severity="info">Loading...</Alert>;

  if (isError) return <Alert severity="error">Some Error</Alert>;

  return (
    <Container>
      <Stack direction="row" my=".5rem">
        <Box p=".4rem .6rem" bgcolor="primary.lighter" borderRadius="4px" marginLeft="auto">
          <Typography color="primary.main">Search Results: {data?.meta.total}</Typography>
        </Box>
      </Stack>

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

          <TableBody>
            {data?.data.map((product) => (
              <ProductRow key={product.id} {...product} />
            ))}
          </TableBody>
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
            onChange={(_, value) => setSearchParams((prev) => ({ ...prev, page: value }))}
          />
        </Box>
      </Stack>
    </Container>
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
