import { ReactElement, forwardRef } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

/**
 *  Custom DatePicker 
 */

interface IDatePickerCustom extends ReactDatePickerProps { }


const CustomInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    (props, ref) => (
        <input
            className="form-control"
            value={props.value}
            onClick={props.onClick}
            onChange={props.onChange}
            ref={ref}
        />
    ));


const DatePickerCustom = ({
    ...props
}: IDatePickerCustom): ReactElement => (

    <DatePicker
        {...props}
        customInput={<CustomInput />}
    />
);


export default DatePickerCustom;