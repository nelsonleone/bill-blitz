export function clickOutside(element: Element, callbackFunction: () => void) {
    function onClick(event: MouseEvent) {
        if (window.innerWidth < 1024 && !element.contains(event.target as HTMLElement)) {
            callbackFunction()
        }
    }

    document.body.addEventListener('click', onClick)

    return {
        update(newCallbackFunction: () => void) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener('click', onClick)
        },
    }
}
