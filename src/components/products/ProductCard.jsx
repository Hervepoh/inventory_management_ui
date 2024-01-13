import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import PublishSwitch from './ui/PublishSwitch';
import { DeleteButton } from '../DeleteButton';
import OptionsMenu from './ui/OptionsMenu';

/**
 * Renders a single product
 * @param {import("src/Types").Product} product
 * @returns
 */
export default function ProductCard({ id, title, price, cost, stockQuantity, published, url }) {
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
}
