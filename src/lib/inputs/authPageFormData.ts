import type { AuthPageInputData } from "../../types/types";

export const authPageInputData:AuthPageInputData[] = [
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