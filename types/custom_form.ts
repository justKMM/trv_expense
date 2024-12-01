export interface CustomForm {
    personal_information: {
        firstname: string | undefined,
        lastname: string | undefined,
        email: string | undefined,
        address: string,
        iban: string,
        phone: {
            code: string,
            number: string
        }
    },
    form_values: {}
}