export type AuthPageInputData = {
  name: string,
  id: string,
  placeholder: string,
  inputType: "email" | "password" | "text", 
  label?: string, 
  labelStyles?: string, 
  name: string, 
  inputStyles?: string, 
  containerStyles?: string,
  error?: string
}

export type CustomButtonPropsType = {
  text: string,
  id?: string,
  class?: string
}


interface InputObjForValidation {
    name: string;
    value: any;
    rules: {
      required?: boolean | string;
      [key: string]: any;
    }
  }
  
  interface ValidationErrors {
    [key: string]: {
      message: string;
    }
  }