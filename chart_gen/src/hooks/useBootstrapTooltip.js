import { useEffect, useRef } from 'react';
import { Tooltip } from 'bootstrap';

const useBootstrapTooltip = () => {
    const tooltipRefs = useRef([]);

    useEffect(() => {
        const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');

        tooltipRefs.current = Array.from(tooltipElements).map(el => new Tooltip(el));

        return () => {
            // 모든 툴팁 제거
            tooltipRefs.current.forEach(tooltip => tooltip.dispose());
            tooltipRefs.current = [];
        };
    }, []);

    const removeAllTooltips = () => {
        tooltipRefs.current.forEach(tooltip => tooltip.dispose());
        tooltipRefs.current = [];
    };

    return removeAllTooltips; // 필요할 때 툴팁을 제거할 수 있도록 함수 반환
};

export default useBootstrapTooltip;
