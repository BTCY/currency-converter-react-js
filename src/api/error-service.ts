import errorMessages from './error-service.messages';

export interface ValidationError {
    field: string;
    errorMessage: string;
    displayMessage: string;
}

export class ServerError extends Error {
    public isValidationError: boolean;
    public validationErrors: ValidationError[] = [];
    constructor(
        public originalError: any,
        public reason: string,
        public displayMessage: string
    ) {
        super(displayMessage);
        this.isValidationError = (reason === 'validation_error');
        if (this.isValidationError) {
            const errors = originalError?.response?.data?.errors;
            const validationMessages = errorMessages.validationErrors;
            (errors.body || []).forEach((errorMessage: string) => {
                const parts = errorMessage.split('"');
                const field = parts[1];
                const displayMessage = validationMessages[field] || validationMessages.default;

                this.validationErrors.push({ field, errorMessage, displayMessage });
            });
        }
    }

    processServerError = (setServerError: (error: ServerError) => any) => {
        return setServerError(this);
    }

    processValidationError = (setFieldError: (field: string, value: string | undefined) => void) => {
        this.validationErrors.forEach((validationError) => {
            setFieldError(validationError.field, validationError.displayMessage);
        });
    }
}

export const getServerError = (originalError: any, errorGroupKey: string = 'common'): ServerError => {
    const reason = originalError?.response?.data?.reason || 'unknown';
    const commonMessages = errorMessages.serverErrors.common;
    const errorGroup: any = errorMessages.serverErrors[errorGroupKey] || commonMessages;
    const displayMessage = errorGroup[reason] || commonMessages[reason] || commonMessages.unknown;

    return new ServerError(originalError, reason, displayMessage);
};