export function checkValidity (value, rules, other) {
    console.log("Check validity " + value)
    let isValid = true;
    if (rules) {
        if ((rules.required) &&
                (Object.prototype.toString.call(value) !== '[object Date]'))   {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minlength) {
        isValid = value.length >= rules.minlength && isValid;
        }
        if (rules.maxlength) {
        isValid = value.length <= rules.minlength && isValid;
        }
        if (rules.match)  {
            isValid = value === other;
        }
    }
    return isValid;
}


export default inputValidation;