import type { InputObjForValidation, ValidationErrors } from "../../types/types";
import { isValidEmail } from "./validateEmail";

export function validateInputs(inputs: InputObjForValidation[]): ValidationErrors {
    const errors: ValidationErrors = {}
  
    for (const input of inputs) {
      const { name, value, rules } = input;
  
      // Check if the input is required
      if (rules.required && (value === '' || value === undefined || value === null)) {
        errors[name] = {
          message: typeof rules.required === 'string' ? rules.required : 'This field is required',
        }
      }

      if (rules.email && !isValidEmail(value)) {
        errors[name] = {
          message: typeof rules.email === 'string' ? rules.email : 'Please enter a valid email address',
        }
      }
  
      if (value && rules.minLength && value.length < rules.minLength?.value) {
        errors[name] = {
          message: rules.minLength.message || `The minimum length for this field is ${rules.minLength.value}`
        }
      }

      if (value && rules.min && parseInt(value) < parseInt(rules.min.value)) {
        errors[name] = {
          message: rules.min.message || `The minimum length for this field is ${rules.min.value}`
        }
      } 
    }
  
    return errors;
}