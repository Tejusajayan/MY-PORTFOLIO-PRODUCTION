import { useState, useEffect } from 'react';

interface BreakpointValues<T> {
    mobile: T;
    tablet?: T;
    desktop?: T;
}

export function useResponsiveValue<T>(values: BreakpointValues<T>): T {
    const [value, setValue] = useState<T>(values.mobile);

    useEffect(() => {
        const updateValue = () => {
            const width = window.innerWidth;
            if (width >= 768 && values.desktop) {
                setValue(values.desktop);
            } else if (width >= 640 && values.tablet) {
                setValue(values.tablet);
            } else {
                setValue(values.mobile);
            }
        };

        updateValue();
        window.addEventListener('resize', updateValue);
        return () => window.removeEventListener('resize', updateValue);
    }, [values]);

    return value;
}
