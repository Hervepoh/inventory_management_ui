import { useCallback, useEffect, useState } from 'react';

export default function useViewport() {
    const resolve = useCallback((windowWidth) => {
        const tabletBreakPoint = 750;
        const DesktopBreakPoint = 1000;

        if (windowWidth < tabletBreakPoint) return 'mobile';
        if (windowWidth < DesktopBreakPoint) return 'tablet';
        return 'desktop';
    }, []);

    const [currentViewport, setCurrentViewport] = useState(resolve(window.innerWidth));

    useEffect(() => {
        const handleResize = (ev) => setCurrentViewport(resolve(ev.target.innerWidth));

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isMobile: currentViewport === 'mobile',
        isTablet: currentViewport === 'tablet',
        isDesktop: currentViewport === 'desktop',
    };
}
