import { useEffect, useState } from 'react';

export default function useViewport() {
    const tabletBreakPoint = 800;

    const [isTablet, setIsTablet] = useState(window.innerWidth >= tabletBreakPoint);

    useEffect(() => {
        const handleResize = (ev) => setIsTablet(ev.target.innerWidth >= tabletBreakPoint);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isTablet };
}
