import { FormEventHandler, ReactElement } from "react";

/**
 *  Custom Form 
 */

const FormCustom = (
    props: any
): ReactElement => {

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit();
    };

    return (
        <form {...props} noValidate autoComplete="off" onSubmit={handleSubmit}>
            {props.children}
        </form>
    );
}

export default FormCustom;