export class Error {
    displayField: string;
    fieldError: string;
    errorMessage: string;

    constructor(displayField: string, fieldError: string, errorMessage: string) {
        this.displayField = displayField;
        this.fieldError = fieldError;
        this.errorMessage = errorMessage;
    }

    setErrorMessage(errorMessage: string) {
        this.errorMessage = this.displayField + ' ' + errorMessage;
    }
}