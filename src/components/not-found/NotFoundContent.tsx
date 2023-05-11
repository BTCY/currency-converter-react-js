import { ReactElement } from "react";

/**
 *  Not found page content (404)
 */

const NotFoundContent = (): ReactElement => (
    <div className="d-flex w-100 align-items-center justify-content-center">
        <div className="text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3">Page not found.</p>
            <p className="lead">
                The page you’re looking for doesn’t exist.
            </p>
            <a href="/" className="btn btn-primary">Go Home</a>
        </div>
    </div>
);


export default NotFoundContent;
