import React from "react";


export default function FormCustom(props: any) {

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit();
    };

    return (
        <form {...props} noValidate autoComplete="off" onSubmit={handleSubmit}>
            {props.children}
        </form>
    );
}