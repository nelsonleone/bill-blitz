<script lang="ts">
  import { Dialog } from "bits-ui";
  import { fade, scale } from "svelte/transition";
  import Icon from "@iconify/svelte";
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";

  export let openModal = false;

</script>
   

<Dialog.Root bind:open={openModal}>
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
          Confirm Your <span class="text-primary-accent-color2"> Email</span>
        </Dialog.Title>
        <Dialog.Description class="text-sm text-foreground-alt mt-3 font-reddit-sans text-center lg:text-base">
            Please check your email and follow the instructions to confirm your account.
        </Dialog.Description>
        <div class="flex flex-col justify-center items-center gap-1 pb-11 pt-7">
            <img src="/icons/cube-loader.svg" class="w-20" alt="" aria-hidden="true" loading="eager" />
        </div>
        <div class="flex w-full justify-center">
          <CustomButton
            href="/auth/sign_in"
            styles="md:w-auto bg-slate-200 font-medium hover:drop-shadow-xl hover:shadow-md transition duration-200 ease-in-out focus:outline focus:outline-base-color2 text-primary-accent-color2"
          >
            I have confirmed my account
          </CustomButton>
        </div>
        <Dialog.Close
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