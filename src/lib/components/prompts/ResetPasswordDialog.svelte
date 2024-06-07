<script lang="ts">
    import { Dialog } from "bits-ui";
    import { fade, scale } from "svelte/transition";
    import Icon from "@iconify/svelte";
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import AuthPageInput from "../inputs/AuthPageInput.svelte";
    import { alertStore } from "../../../store";
    import { AlertSeverity } from "../../../enums";
  
    export let resetFormError;

    if(resetFormError){
        alertStore.set({
            severity: AlertSeverity.ERROR,
            mssg: resetFormError
        })
    }

    const handleReset = async(e:{ currentTarget: EventTarget & HTMLFormElement}) => {
        await fetch(e.currentTarget.action,{
            method: "POST",
            body: new FormData(e.currentTarget)
        })
    } 
  
    $: error = resetFormError || "";
</script>
     
  
  <Dialog.Root open>
    <Dialog.Portal>
        <Dialog.Overlay
            transition={fade}
            transitionConfig={{ duration: 150 }}
            class="fixed inset-0 z-50 bg-black/80"
        />
        <Dialog.Content
            transition={scale}
            class="fixed left-[50%] top-[50%] z-50 w-full rounded-xl text-primary-dark-blue max-w-[94%] translate-x-[-50%] translate-y-[-50%] border bg-gray-100 p-5 pt-16 shadow-popover outline-none sm:max-w-[490px] md:w-full md:px-10"
        >
            <Dialog.Title
            class="w-full text-center text-2xl font-rubik font-semibold tracking-tight"
            >
            Reset <span class="text-primary-accent-color2"> Password</span>
            </Dialog.Title>
            <Dialog.Description class="text-sm text-foreground-alt mt-3 font-overpass text-center lg:text-base">
                Please enter the email linked to your account
            </Dialog.Description>
            <form action="/auth?/reset_password" on:submit|preventDefault={handleReset} method="post" class="flex flex-col justify-center items-center mt-4 gap-1">
                <AuthPageInput 
                    inputProps={{
                        inputType:"email",
                        inputStyles:"placeholder:text-gray-500",
                        labelStyles: "mb-4 font-medium",
                        name: "email",
                        label: "Enter Your Email:",
                        id: "reset_password_email",
                        placeholder: "billblitzuser@examplemail.com",
                    }}
                />
                <div class="flex w-full justify-center">
                    <CustomButton
                        buttonType="submit"
                        styles="md:w-36 py-3 bg-primary-accent-color3 my-4 font-medium hover:opacity-90 focus:outline hover:drop-shadow-xl hover:shadow-md transition duration-200 ease-in-out focus:outline-1 focus:outline-primary-accent-color3 focus:text-base-color2 focus:bg-transparent text-primary-base-color1"
                    >
                        Reset
                    </CustomButton>
                </div>
            </form>
            <Dialog.Close
                on:click={() => history.back()}
                class="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
            >
            <div>
                <Icon icon="icon-park-solid:error" />
                <span class="sr-only">Close</span>
            </div>
            </Dialog.Close>
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>