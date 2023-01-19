const errorMessages = {
    serverErrors: {
        common: {
            default: 'Ошибка на сервере. Попробуйте еще раз.',
            unknown: 'Ошибка на сервере. Попробуйте еще раз.',
            Forbidden: 'У вас не хватает прав',
        },
    },
    validationErrors: {
        default: 'Поле заполнено не верно.'
    },
} as any;

export default errorMessages;