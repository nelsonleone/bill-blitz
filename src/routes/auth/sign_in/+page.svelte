<script lang="ts">
    import CustomButton from "$lib/buttons/CustomButton.svelte";
    import IconButton from "$lib/buttons/IconButton.svelte";
    import AuthPageInput from "$lib/inputs/AuthPageInput.svelte";
    import { signInInputData } from "$lib/inputs/authPageFormData";
    import Icon from "@iconify/svelte";

</script>

<svelte:head>
    <title>Sign In | BillBlitz</title>
</svelte:head>

<main class="bg-gray-100 px-0 page flex justify-center items-center text-primary-dark-blue">
    <section class="flex flex-col-reverse md:items-center md:flex-row md:w-4/5 lg:w-4/6 md:bg-base-color1 md:p-8 md:rounded-2xl md:relative md:gap-8 md:justify-between md:overflow-hidden">
  
        <div class="bg-base-color1 relative z-10 drop-shadow-md shadow-md rounded-md px-4 w-[95%] mx-auto -translate-y-28 pt-24 pb-16 overflow-hidden after:content-[''] after:bg-[url('/icons/blob.svg')] after:left-0 after:w-28 after:bg-contain after:bg-no-repeat after:aspect-square after:block after:absolute before:content-[''] before:bg-[url('/icons/blob2.png')] before:right-0 before:top-0 before:w-28 before:bg-contain before:bg-no-repeat before:aspect-square before:-z-10 before:block before:absolute md:-translate-y-0 md:rounded-none md:shadow-none md:drop-shadow-none md:py-4 md:mx-0 md:w-[48%] md:after:-left-8 md:after:-bottom-20 md:overflow-visible md:before:-top-8">
            <h1 class="text-3xl text-center capitalize my-4">Welcome Back</h1>
            <p class="text-center text-sm">Sign in to save time and effort with our intuitive invoicing and receipt generation features.</p>
            <form>
                {#each signInInputData as inputData (inputData.id) }
                  <AuthPageInput inputProps={{...inputData, inputStyles: "text-[#374151]"}} />
                {/each}

                <CustomButton 
                    on:click
                    styles="mt-8 rounded-md"
                    text="Proceed"
                />

                <div class="flex justify-between items-center my-6">
                    <a href="/" class="text-primary-accent-color2 underline font-medium">Forgot Password</a>
                    <a href="/auth/create_account" class="text-primary-accent-color2 underline font-medium">Create Account</a>
                </div>

                <div class="flex flex-col justify-center items-center w-56 mx-auto">
                    <p class="text-center decoration-dotted underline font-medium my-3">Other Sign-In Options</p>
                    <IconButton text="Google" styles="text-sm py-2 w-[9em] rounded-lg bg-transparent border border-gray-600 text-primary-dark-blue my-2 font-medium hover:scale-105 hover:shadow-inner hover:drop-shadow-md">
                        <Icon aria-hidden="true" class="text-2xl" icon="flat-color-icons:google" />
                    </IconButton>
                    <IconButton text="Facebook" styles="text-sm py-2 w-[9em] rounded-lg bg-transparent border border-gray-600 text-primary-dark-blue my-2 font-medium hover:scale-105 hover:shadow-inner hover:drop-shadow-md">
                        <Icon aria-hidden="true" class="text-2xl" icon="logos:facebook" />
                    </IconButton>
                </div>
            </form>
        </div>

        <div class="md:w-[48%] md:h-[32em]">
            <img src="/images/signin-page-image.png" alt="a man in office" class="object-cover w-full h-full block md:rounded-2xl" />
        </div>
    </section>
</main>