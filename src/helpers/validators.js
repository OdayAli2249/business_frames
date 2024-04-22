export class Validator {

    static validate(input, validations) {
        var res;
        var errors = []
        var a = parseInt(input) >= 0;
        var b = parseInt(input) <= 100;
        var c = /^[0-9]+$/.test(input);
        if (validations.includes(Validations.REQUIRED))
            input == null || input == '' || input == [] ? errors.push("this field is required") : res = true;
        if (validations.includes(Validations.PERCENTAGE))
            (/^[0-9]+$/.test(input) && parseInt(input) <= 100 && parseInt(input) >= 0)
                || input == null || input == '' ? res = true :
                errors.push("percentage value should be number between 0 and 100");
        if (validations.includes(Validations.NAME))
            /^[A-Za-z0-9\s]+$/.test(input) || input == null || input == ''
                ? res = true : errors.push("name should contain alphanumeric characters only");

        return errors.length == 0 ? null : errors;
    }
}

export class Validations {
    static REQUIRED = 'REQUIRED';
    static NAME = 'NAME';
    static PERCENTAGE = 'PERCENTAGE';
}