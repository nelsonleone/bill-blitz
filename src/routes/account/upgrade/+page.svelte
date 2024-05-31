<script>

    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
import Icon from "@iconify/svelte";
    import { Checkbox, Label } from "bits-ui";

</script>

<main class="page px-4 md:px-6 text-primary-very-dark-blue">
    <h1 class="mt-20 text-center text-2xl md:text-4xl font-rubik">Upgrade To <span class="text-primary-accent-color2">Unlock Your Account</span></h1>
    <p class="md:text-center md:w-1/2 md:mx-auto md:mt-4">Upgrading your accounts unlocks the feature of creating, downloading and sharing infinite number of invoice and receipts for <span class="text-orange-600 capitalize">A month.</span></p>
    
    <div class="my-12">
        <h2 class="mb-4 font-medium text-xl underline md:w-80 md:mx-auto">Plans and Pricing</h2>
        <div class="bg-orange-600 p-4 rounded-3xl h-[25em] relative text-base-color1 md:w-80 md:mx-auto">
            <p class="flex absolute flex-row-reverse top-4 right-4">
                <Icon icon="game-icons:sea-star" />
                <span>Top Rated</span>
            </p>

            <div class="flex items-baseline gap-1 mt-16">
                <strong class="flex items-baseline text-3xl">
                    <Icon icon="oi:dollar" aria-label="dollar" />
                    <span>15</span>
                </strong>
                <span>/month</span>
            </div>

            <h2 class="text-center my-8 font-medium pb-4 underline">Unlocked Features</h2>
            <div class="flex flex-col gap-6">
                <div class="flex items-center space-x-3">
                    <Checkbox.Root
                      id="upgrade-pricing"
                      aria-labelledby="upgrade-pricing-label"
                      class="peer inline-flex size-[25px] items-center justify-center rounded-md border border-muted bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
                      checked
                    >
                      <Checkbox.Indicator class="inline-flex items-center justify-center text-background">
                        <Icon icon="ph:seal-check" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <Label.Root
                      id="terms-label"
                      for="upgrade-pricing"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Infinite Invoice and Receipt creation
                    </Label.Root>
                </div>
                <div class="flex items-center space-x-3">
                    <Checkbox.Root
                      id="upgrade-pricing"
                      aria-labelledby="upgrade-pricing-label"
                      class="peer inline-flex size-[25px] items-center justify-center rounded-md border border-muted bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
                      checked
                    >
                      <Checkbox.Indicator class="inline-flex items-center justify-center text-background">
                        <Icon icon="ph:seal-check" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <Label.Root
                      id="terms-label"
                      for="upgrade-pricing"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Share created bill through your social media
                    </Label.Root>
                </div>
            </div>

            <CustomButton styles="mx-auto mt-4 bg-base-color1 text-primary-very-dark-blue rounded-3xl py-3 hover:bg-transparent hover:text-base-color1 hover:outline hover:outline-1 hover:outline-base-color1 focus:bg-transparent focus:text-base-color1 focus:outline focus:outline-1 focus:outline-base-color1">Pay Now</CustomButton>
        </div>
    </div>
</main>