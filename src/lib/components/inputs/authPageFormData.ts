import type { AuthPageInputData } from "../../types/types";

const signInInputData:AuthPageInputData[] = [
    {
        name: "email",
        inputType: "email",
        placeholder: "Enter email",
        id: "signin-email"  
    },
    {
        name: "password",
        inputType: "password",
        placeholder: "Enter password",
        id: "signin-password"  
    }
]

const createAccountInputData:AuthPageInputData[] = [
    {
        name: "displayName",
        inputType: "text",
        placeholder: "Enter your name",
        id: "signup-username"  
    },
    {
        name: "email",
        inputType: "email",
        placeholder: "Enter email",
        id: "signup-email"  
    },
    {
        name: "password",
        inputType: "password",
        placeholder: "Enter password",
        id: "signup-password"  
    }
]


export {
    createAccountInputData,
    signInInputData
}