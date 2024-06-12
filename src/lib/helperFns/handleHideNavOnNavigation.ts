import { afterNavigate, beforeNavigate } from "$app/navigation";
import { Breapoints } from "../../enums";
import { showNav } from "../../store";

export function handleHideNavOnNavigation(pathName:string){
    beforeNavigate(() => {
        if(pathName && window.innerWidth < Breapoints.Desktop){
            showNav.set(false)
        }
    })
    afterNavigate(() => {
        if(pathName && window.innerWidth < Breapoints.Desktop){
            showNav.set(false)
        }
    })
}