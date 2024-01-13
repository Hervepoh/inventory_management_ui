import { Skeleton, TableCell, TableRow } from '@mui/material';

export default function TableLoading() {
    return (
        <>
            {[...Array(10).keys()].map((index) => (
                <TableRow key={index}>
                    <TableCell colSpan={7}>
                        <Skeleton variant="rounded" height={60} />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}
