import { ReactNode, ReactElement } from 'react';
import { Tooltip as BSTooltip } from 'react-bootstrap';
import { OverlayInjectedProps } from 'react-bootstrap/esm/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

/**
 *   Tooltip
 */

interface ITooltip {
    children?: ReactNode;
    tooltipText?: string;
}

const renderTooltip = (props: OverlayInjectedProps, text: string) => (
    <BSTooltip id="button-tooltip" {...props}>
        {text}
    </BSTooltip>
);

const Tooltip = ({
    children = undefined,
    tooltipText = '123',
}: ITooltip): ReactElement<any, any> => {

    return (
        <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={p => renderTooltip(p, tooltipText)}
        >
            <>{children && children}</>
        </OverlayTrigger>
    );
}

export default Tooltip;