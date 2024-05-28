<script lang="ts">
    import { goto } from "$app/navigation";
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import AuthPageInput from "$lib/components/inputs/AuthPageInput.svelte";
    import { AlertSeverity } from "../../../../enums";
    import { alertStore } from "../../../../store";

    export let form;

    $: error = form?.invalidPassword;

    $: {
        if(form?.errorMessage){
            alertStore.set({
                severity: AlertSeverity.ERROR,
                mssg: form?.errorMessage
            })
        }

        if(form?.success){
            alertStore.set({
                severity: AlertSeverity.SUCCESS,
                mssg: "Password changed successfully"
            })

            goto("/auth/sign_in")
        }
    }

</script>
<main class="page flex justify-center items-center flex-col">
    <div class="min-h-36 mt-16 h-[22em] shadow-xl bg-custom-dark-green rounded-md px-4 py-8 md:w-96 md:mt-0 md:px-8">
        <h1 class="text-center font-rubik my-6 text-3xl text-base-color1">Enter Your New <span class="text-green-300"> Password</span></h1>
        <form method="POST">
            <AuthPageInput 
                inputProps={{
                    inputType: "password",
                    id: "change-password-input",
                    name: "password",
                    placeholder: "Enter new password",
                    inputStyles: "",
                }}
                {error}
            />
    
            <CustomButton buttonType="submit" styles="my-8 focus:outline focus:outline-2 focus:outline-base-color1 focus:bg-transparent" >Set Password</CustomButton>
        </form>
    </div>
</main>