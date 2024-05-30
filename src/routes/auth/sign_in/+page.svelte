<script>
    import AuthPageInput from "$lib/components/inputs/AuthPageInput.svelte";
    import { signInInputData } from "$lib/components/inputs/authPageFormData";
    import { validateInputs } from "$lib/helperFns/formValidator";
    import { AlertSeverity } from "../../../enums";
    import { alertStore } from "../../../store";
    import LoadingBtn from "$lib/components/buttons/LoadingBtn.svelte";
    import OtherSignInOptions from "$lib/components/buttons/OtherSignInOptions.svelte";

    export let form;

    /** @type any */
    $: errors = undefined;

    /** @type boolean */
    let isSubmitting = false;

    /** @param {{ currentTarget: EventTarget & HTMLFormElement}} e */
    const handleSubmit = async(e) => {

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
                        required: "Please enter your password"
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
            
            alertStore.set({
                mssg: "Successfully signed in",
                severity: AlertSeverity.SUCCESS
            })
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
    <title>Sign In | BillBlitz</title>
</svelte:head>

<main class="bg-gray-100 px-0 page flex justify-center items-center text-primary-dark-blue">
    <section class="flex flex-col-reverse md:items-center md:flex-row md:w-4/5 lg:w-4/6 md:bg-base-color1 md:p-8 md:rounded-2xl md:relative md:gap-8 md:justify-between md:overflow-hidden">
  
        <div class="bg-base-color1 relative z-10 drop-shadow-md shadow-md rounded-md px-4 w-[95%] mx-auto -translate-y-28 pt-24 pb-16 overflow-hidden after:content-[''] after:bg-[url('/icons/blob.svg')] after:left-0 after:w-28 after:bg-contain after:bg-no-repeat after:aspect-square after:block after:absolute before:content-[''] before:bg-[url('/icons/blob2.png')] before:right-0 before:top-0 before:w-28 before:bg-contain before:bg-no-repeat before:aspect-square before:-z-10 before:block before:absolute md:-translate-y-0 md:rounded-none md:shadow-none md:drop-shadow-none md:py-4 md:mx-0 md:w-[48%] md:after:-left-8 md:after:-bottom-20 md:overflow-visible md:before:-top-8">
            <h1 class="text-3xl text-center capitalize my-4">Welcome Back</h1>
            <p class="text-center text-sm">Sign in to save time and effort with our intuitive invoicing and receipt generation features.</p>
            
            <form action="?/login" on:submit|preventDefault={handleSubmit}>
                {#each signInInputData as inputData (inputData.id) }
                  <AuthPageInput on:input={clearErrorOnInputChange} error={errors && errors[inputData.name] ? errors[inputData.name]?.message : undefined} inputProps={{...inputData, inputStyles: "text-[#374151]" }} />
                {/each}

                <LoadingBtn 
                    on:click
                    styles="mt-8 rounded-md hover:opacity-80"
                    text="Proceed"
                    inputType="submit"
                    loading={isSubmitting}
                />

                <div class="flex justify-between items-center my-6">
                    <a href="/auth/reset_password" class="text-primary-accent-color2 underline font-medium">Forgot Password</a>
                    <a href="/auth/create_account" class="text-primary-accent-color2 underline font-medium">Create Account</a>
                </div>
            
            </form>
            <OtherSignInOptions formActionBase="?/login" form={form} />
        </div>

        <div class="md:w-[48%] md:h-[32em]">
            <img src="/images/signin-page-image.png" alt="a man in office" class="object-cover w-full h-full block md:rounded-2xl" />
        </div>
    </section>
</main>