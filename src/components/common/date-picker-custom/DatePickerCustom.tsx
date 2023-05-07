import { forwardRef } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

interface IDatePickerCustom extends ReactDatePickerProps {

}


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
}: IDatePickerCustom) => {
    return (
        <DatePicker
            {...props}
            customInput={<CustomInput />}
        />
    )
};

export default DatePickerCustom;