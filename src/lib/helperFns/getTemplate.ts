import { templatesArray } from "$lib/templates";
import { TemplateNames } from "../../enums";

export function getTemplate(templateName:TemplateNames | null){
    if(templateName === TemplateNames.BlueMinimalist){
        return templatesArray.BlueMinimalist;
    }

    else if(templateName === TemplateNames.WhiteSimple){
        return templatesArray.WhiteSimple;
    }
    else {
        return null;
    }
}