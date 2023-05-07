import errorMessages from './error-service.messages';

/**
 * Custom Error handling class from the server
 */

export class ServerError extends Error {
    constructor(
        public originalError: any,
        public reason: string,
        public displayMessage: string
    ) {
        super(displayMessage);
    }

    processServerError = (setServerError: (error: ServerError) => any) => {
        return setServerError(this);
    }
}

export const getServerError = (originalError: any, errorGroupKey: string = 'common'): ServerError => {
    const reason = originalError?.response?.data?.reason || 'unknown';
    const commonMessages = errorMessages.serverErrors.common;
    const errorGroup: any = errorMessages.serverErrors[errorGroupKey] || commonMessages;
    const displayMessage = errorGroup[reason] || commonMessages[reason] || commonMessages.unknown;

    return new ServerError(originalError, reason, displayMessage);
};