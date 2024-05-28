<script lang="ts">
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import AuthPageInput from "$lib/components/inputs/AuthPageInput.svelte";
    import Icon from "@iconify/svelte";
    import { Dialog } from "bits-ui";
    import { fade, scale } from "svelte/transition";
    import { alertStore } from "../../../store.js";
    import { AlertSeverity } from "../../../enums.js";
    import { goto } from "$app/navigation";
    import { supabaseClient } from "$lib/supabaseClient.js";
    import { isValidEmail } from "$lib/helperFns/validateEmail.js";
    import { PUBLIC_BILL_BLITZ_BASE_URL } from "$env/static/public";
    import LoadingBtn from "$lib/components/buttons/LoadingBtn.svelte";


    let inputError : string;
    let isSubmitting : boolean = false;


    const handleReset = async(e:{ currentTarget: EventTarget & HTMLFormElement}) => {
        try{
            isSubmitting = true;
            const email = new FormData(e?.currentTarget).get("email") as string;

            if(!email || !isValidEmail(email)){
                inputError = "Please enter a valid email address"
            }

            const { error } = await supabaseClient.auth.resetPasswordForEmail(email,{
                redirectTo: `${PUBLIC_BILL_BLITZ_BASE_URL}/auth/reset_password/set_new`
            })

            alertStore.set({
                mssg: `Reset mail sent to${email}`,
                severity: AlertSeverity.SUCCESS
            })

            goto("/auth/sign_in")

            if(error){
                throw new Error(error.message)
            }
        }
        catch(err:any|unknown){
            alertStore.set({
                mssg: err.message || "Error occurred resetting password",
                severity: AlertSeverity.ERROR
            })
        }

        finally{
            isSubmitting = false;
        }
    }
</script>


<svelte:head>
    <title>Reset Password - Bill-Blitz</title>
</svelte:head>
     
  
<Dialog.Root open closeOnOutsideClick={false}>
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
            <Dialog.Description class="text-sm text-foreground-alt mt-3 font-reddit-sans text-center lg:text-base">
                Please enter the email linked to your account
            </Dialog.Description>
            <form on:submit|preventDefault={handleReset} class="flex flex-col justify-center items-center mt-4 gap-1">
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
                    on:input={() => inputError = ""}
                    error={inputError}
                />
                <div class="flex w-full justify-center">
                    <LoadingBtn
                        inputType="submit"
                        loading={isSubmitting}
                        text="Reset"
                        styles="md:w-36 py-3 bg-primary-accent-color3 my-4 font-medium hover:opacity-90 hover:drop-shadow-xl hover:shadow-md transition duration-200 ease-in-out"
                    />
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