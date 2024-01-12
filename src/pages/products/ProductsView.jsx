import { Helmet } from 'react-helmet-async';
import ProductsTable from '../products';

export default function ProductsView() {
    return (
        <>
            <Helmet>
                <title> Products | Minimal UI </title>
            </Helmet>

            <ProductsTable />
        </>
    );
}
