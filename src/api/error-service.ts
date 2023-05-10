import errorMessages from "./error-service.messages";

/**
 *  Custom Error handling class from the server
 */

export class ServerError extends Error {
    constructor(
        public code: string,
        public message: string,
        public originalError: any,
    ) {
        super(originalError);
    }

    processServerError = (setServerError: (error: ServerError) => any) => {
        return setServerError(this);
    }
}

export const getServerError = (originalError: any): ServerError => {
    const code = originalError?.response?.data?.error?.code || errorMessages.message.code;
    const message = originalError?.response?.data?.error?.message || errorMessages.message.default;

    return new ServerError(code, message, originalError);
};