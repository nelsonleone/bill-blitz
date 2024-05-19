export type AuthPageInputData = {
    name: string,
    id: string,
    placeholder: string,
    inputType: "email" | "password" | "text", 
    label?: string, 
    labelStyles?: string, 
    name: string, 
    inputStyles?: string, 
    containerStyles?: string
}