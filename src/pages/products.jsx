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
  Pagination,
  useTheme,
  Card,
  CardContent,
  Container,
  CardActions,
  ClickAwayListener,
  IconButton,
  CircularProgress,
} from '@mui/material';
import useProducts from 'src/queries/useProducts';
import React, { useEffect, useState } from 'react';
import { DeleteButton } from 'src/components/DeleteButton';
import { MoreHorizRounded } from '@mui/icons-material';

const PublishSwitch = ({ url, published }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['products'],
    mutationFn: () => apiClient.patch(`${url}/toggle-publish`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  return <Switch size="small" checked={published} disabled={isPending} onChange={() => mutate()} />;
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

const OptionsMenu = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => setOpen((prev) => !prev);

  const handleClickAway = () => setOpen(false);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }}>
        <IconButton onClick={handleClick}>
          <MoreHorizRounded />
        </IconButton>
        {open ? (
          <Box sx={{ position: 'absolute', right: 0, bgcolor: '#f2f2f2', borderRadius: '0.2rem' }}>
            {children}
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

/**
 * Renders a single product
 * @param {import("src/Types").Product} product
 * @returns
 */
const ProductCard = ({ id, title, price, cost, stockQuantity, published, url }) => {
  return (
    <Card variant="elevation">
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ borderRadius: '.6rem', bgcolor: 'primary.lighter', p: '.4rem .6rem' }}>
          <Typography component="span" color="primary.main">
            Published:{' '}
          </Typography>
          <PublishSwitch published={published} url={url} />
        </Box>

        <OptionsMenu>
          <DeleteButton url={url} invalidate={['products']} />
        </OptionsMenu>
      </CardActions>

      <CardContent>
        <Typography fontSize="1.5rem">{title}</Typography>
      </CardContent>
    </Card>
  );
};

const useViewport = () => {
  const tabletBreakPoint = useTheme().breakpoints.values.sm;
  const [isTablet, setIsTablet] = useState(window.innerWidth >= tabletBreakPoint);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth >= tabletBreakPoint);

    window.addEventListener('resize', handleResize);

    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isTablet };
};

const ProductsTable = () => {
  const { data, isLoading, isError, isSuccess, page, setSearchParams } = useProducts();

  const { isTablet } = useViewport();

  return (
    <Container>
      {isLoading ? <CircularProgress /> : null}

      {isError ? <Alert severity="error">Some Error</Alert> : null}

      {isSuccess ? (
        <>
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
        </>
      ) : null}
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
