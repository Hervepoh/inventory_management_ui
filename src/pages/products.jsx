import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import apiClient from 'src/utils/apiClient';

import { DeleteButton } from 'src/components/DeleteButton';

import { Table, TableBody, TableHead, TableRow } from '@mui/material';

// ----------------------------------------------------------------------

/**
 * Renders a single product
 * @param {import("src/Types").Product} product
 * @returns
 */
function Product({ id, title, price, cost, stockQuantity, published, url }) {
  return (
    <TableRow key={id}>
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input id="checkbox-table-search-3" type="checkbox" />
        </div>
      </td>
      <th scope="row" className="px-6 py-4 ">
        {title}
      </th>
      <td className="px-6 py-4">{price}</td>
      <td className="px-6 py-4">{cost}</td>
      <td className="px-6 py-4">{stockQuantity}</td>
      <td className="px-6 py-4">{published}</td>
      <td className="flex items-center px-6 py-4">
        <DeleteButton url={url} invalidate="products" />
        <Link className="w-7 h-7 bg-blue-600 text-white rounded-full flex justify-center items-center ms-2" />
      </td>
    </TableRow>
  );
}

export default function ProductsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => apiClient.get('products').then((response) => response.data),
  });

  const renderProducts = () => {
    if (isLoading) return <h1>Loading..</h1>;

    if (isError) return <h1>Error</h1>;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <th className="px-6 py-3" scope="col">
              Title
            </th>
            <th className="px-6 py-3" scope="col">
              Price
            </th>
            <th className="px-6 py-3" scope="col">
              Cost
            </th>
            <th className="px-6 py-3" scope="col">
              Stock Quantity
            </th>
            <th className="px-6 py-3" scope="col">
              Published
            </th>
            <th className="px-6 py-3" scope="col">
              Actions
            </th>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((product) => (
            <Product {...product} />
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
