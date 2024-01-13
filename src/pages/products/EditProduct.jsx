import { Container, FormControl, FormControlLabel, InputLabel, TextField } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import useProduct from 'src/hooks/queries/useProduct';

/**
 *
 * @return {import('react').ReactNode}
 */
export default function EditProduct() {
    const { data: product } = useProduct();

    return (
        <>
            <Helmet>
                <title> Add new Products </title>
            </Helmet>

            <Container>
                <form>
                    <FormControl fullWidth sx={{ mb: '1.4rem' }}>
                        <TextField value={product?.title} />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: '1.4rem' }}>
                        <TextField required value={product?.cost} />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: '1.4rem' }}>
                        <TextField required value={product?.stockQuantity} />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: '1.4rem' }}>
                        <TextField required value={product?.price} />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: '1.4rem' }}>
                        <TextField required value={product?.price} />
                    </FormControl>
                </form>
            </Container>
        </>
    );
}
