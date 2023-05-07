import { ReactNode, ReactElement, JSXElementConstructor } from "react";
import { Tooltip } from "react-bootstrap";
import OverlayTrigger, { OverlayTriggerRenderProps } from "react-bootstrap/OverlayTrigger";

/**
 *  Custom tooltip
 */

interface ITooltipCustom {

    /** ID tooltip */
    id: string;

    /** Content that wraps the tooltip */
    children: ReactElement<any, string | JSXElementConstructor<any>> | ((props: OverlayTriggerRenderProps) => ReactNode);

    /** Tooltip text */
    tooltipText?: string;
}


const TooltipCustom = ({
    id,
    tooltipText,
    children,
}: ITooltipCustom): ReactElement => (

    <OverlayTrigger
        placement="top"
        overlay={
            <Tooltip id={`tooltip-${id}`}>
                {tooltipText}
            </Tooltip>
        }
    >
        {children}
    </OverlayTrigger>
);


export default TooltipCustom;