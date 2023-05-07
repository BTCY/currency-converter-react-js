import { ReactNode, ReactElement, JSXElementConstructor } from "react";
import { Tooltip } from "react-bootstrap";
import OverlayTrigger, { OverlayTriggerRenderProps } from "react-bootstrap/OverlayTrigger";

/**
 *   CustomTooltip
 */

interface ICustomTooltip {
    id: string;
    children: ReactElement<any, string | JSXElementConstructor<any>> | ((props: OverlayTriggerRenderProps) => ReactNode);
    tooltipText?: string;
}

const CustomTooltip = ({
    id = "",
    tooltipText = "",
    children,
}: ICustomTooltip): ReactElement<any, any> => {

    return (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip
                    id={`tooltip-${id}`}
                >
                    {tooltipText}
                </Tooltip>
            }
        >
            {children}
        </OverlayTrigger>
    );
}

export default CustomTooltip;