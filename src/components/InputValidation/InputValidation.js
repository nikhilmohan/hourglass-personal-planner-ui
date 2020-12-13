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

export function validate(event, inputId, updatedElement)    {
    console.log("Date val: " + updatedElement.value);
    if (inputId === 'dueDate')  {
        updatedElement.value = event;            
    } else {
        updatedElement.value = event.target.value;
    }
  //  const valid = this.checkValidity(updatedElement.value, updatedElement.validation);
    const valid = checkValidity(updatedElement.value, updatedElement.validation, null);
   
    updatedElement.isValid = valid;
    updatedElement.touched = true;
    return updatedElement;
}

