import { Card, CardContent, Skeleton, Stack } from '@mui/material';

export default function FeedLoading() {
    return (
        <>
            {[...Array(10).keys()].map((index) => (
                <Stack key={index}>
                    <Card>
                        <CardContent>
                            <Skeleton height="2rem"></Skeleton>
                            <Skeleton height="4rem"></Skeleton>
                        </CardContent>
                    </Card>
                </Stack>
            ))}
        </>
    );
}
