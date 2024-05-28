<script>
    import IconButton from "$lib/components/buttons/IconButton.svelte";
    import LoadingBtn from "$lib/components/buttons/LoadingBtn.svelte";
    import AuthPageInput from "$lib/components/inputs/AuthPageInput.svelte";
    import { createAccountInputData } from "$lib/components/inputs/authPageFormData";
    import Icon from "@iconify/svelte";
    import { alertStore } from "../../../store";
    import { AlertSeverity } from "../../../enums";
    import { validateInputs } from "$lib/helperFns/formValidator";
    import ConfirmEmailModal from "$lib/components/prompts/ConfirmEmailModal.svelte";
    import OtherSignInOptions from "$lib/components/buttons/OtherSignInOptions.svelte";

    /** @type any */
    $: errors = undefined;

    /** @type boolean */
    let isSubmitting = false;
    let showModal = false;


    /** @param {{ currentTarget: EventTarget & HTMLFormElement}} e */
    const handleSignUp = async(e) => {
        try{
            isSubmitting = true;
            const formData = new FormData(e.currentTarget)

            errors = validateInputs([
                {
                    name: "email",
                    value: formData.get("email"),
                    rules: {
                        required: "Please enter your email address"
                    }
                },
                {
                    name: "password",
                    value: formData.get("password"),
                    rules: {
                        required: "Please enter your password",
                        minLength: {
                            value: 7,
                            message: "Password is too short"
                        }
                    }
                },
                {
                    name: "displayName",
                    value: formData.get("displayName"),
                    rules: {
                        required: true
                    }
                }
            ])

            if(Object.values(errors).length > 0){ 
                return;
            }

            const res = await fetch(e.currentTarget.action,{
                body: formData,
                method: "POST"
            })

            if(!res.ok){
               const { error: { message }} = await res.json()
               throw new Error(message)
            } 

            showModal = true;
        }
        catch(err){
            alertStore.set({
                mssg: err.message || "Error occurred while signing in",
                severity: AlertSeverity.ERROR
            })
        }
        finally{ 
            isSubmitting = false; 
        }
    }


    /**
     * 
     * @param {{ currentTarget: EventTarget & HTMLInputElement}} e
    */
    const clearErrorOnInputChange = (e) => {
        if(errors && errors[e.target?.name]?.message){
            errors[e.target?.name] = ""
        }
    }
</script>

<svelte:head>
    <title>Create Account | BillBlitz</title>
</svelte:head>

<main class="bg-base-color1 page p-0 md:p-0 flex justify-center items-center md:block text-primary-dark-blue">
    <section class="flex flex-col-reverse md:flex-row-reverse md:relative  md:pt-28">
  
        <div class="bg-base-color1 relative z-10 drop-shadow-md shadow-md rounded-md px-4 -translate-y-14 w-[95%] mx-auto pt-24 pb-16 overflow-hidden after:content-[''] after:bg-[url('/icons/blob3.png')] after:right-0 after:w-28 after:bg-contain after:bg-no-repeat after:top-0 after:aspect-square after:block after:absolute before:content-[''] md:w-[48%] md:overflow-y-auto md:pb-10 md:pt-40 md:px-16 lg:px-24 md:after:right-0 md:after:left-auto md:after:top-16 md:mx-0 md:bg-transparent md:shadow-none md:drop-shadow-none">
            <h1 class="text-3xl text-center capitalize my-4">Create Account</h1>
            <p class="text-center text-sm">Sign-Up for seamless invoicing and receipts.</p>           
           <form action="?/signup" on:submit|preventDefault={handleSignUp}>
                {#each createAccountInputData as inputData (inputData.id) }
                    <AuthPageInput on:input={clearErrorOnInputChange} error={errors && errors[inputData.name] ? errors[inputData.name]?.message : undefined} inputProps={{...inputData, inputStyles: "text-[#374151]" }} />
                {/each}

                <LoadingBtn
                    on:click
                    styles="mt-8 rounded-md hover:opacity-80"
                    text="Proceed"
                    inputType="submit"
                    loading={isSubmitting}
                />

                <div class="flex justify-end items-center my-6">
                    <a href="/auth/sign_in" class="text-primary-accent-color2 underline font-medium">Log In</a>
                </div>

                <OtherSignInOptions />
            </form>
        </div>

        <div class="w-full relative h-[30em] md:w-1/2 md:h-screen md:fixed left-0 md:top-0">
            <div class="absolute px-4 bottom-32 text-base-color1 z-10 md:bottom-0 md:h-1/3 md:w-10/12 md:top-0 md:my-auto md:px-8">
                <h2 class="mb-4 text-3xl drop-shadow-md shadow-md md:text-4xl">Create an account today to unlock streamlined <span class="text-primary-accent-color1">invoicing and receipt generation</span>.</h2>
                <p class="drop-shadow-md lg:text-xl">Our intuitive platform makes it easy to create quick bills (Invoice and receipts), get paid fast.</p>
            </div>
            <img src="/images/pexels-jopwell-2422278.jpg" alt="a man in office" class="object-cover w-full h-full block brightness-[.4]" />
        </div>
    </section>
</main>

{#if showModal}
  <ConfirmEmailModal openModal={showModal} />
{/if}