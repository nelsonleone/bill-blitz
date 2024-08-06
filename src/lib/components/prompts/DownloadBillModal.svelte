<script lang="ts">
    import { Dialog } from "bits-ui";
    import { fade, scale } from "svelte/transition";
    import Icon from "@iconify/svelte";
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import { goto } from "$app/navigation";
    import LoadingEllipse from "../../statics-assets/loading-ellipse2.svg"

    export let billType : "receipt" | "invoice"; 
    export let downloadImage : (isDraft:boolean) => void;
    export let downloading : boolean = false;
</script>
     
  
  <Dialog.Root open closeOnOutsideClick={false} preventScroll>
      <Dialog.Portal>
        <Dialog.Overlay
          transition={fade}
          transitionConfig={{ duration: 250 }}
          class="fixed inset-0 z-50 bg-black/80"
        />
        <Dialog.Content
          transition={scale}
          transitionConfig={{ duration: 250 }}
          class="absolute left-[50%] top-0 my-auto max-h-[30em] bottom-0 z-50 w-full rounded-xl text-base-color1 max-w-[94%] translate-x-[-50%] border border-gray-50/50 bg-custom-dark-green p-5 pt-16 shadow-md outline-none sm:max-w-[490px] md:w-full md:px-10"
        >
         
          <Dialog.Title
            class="w-full text-center text-3xl font-rubik font-semibold tracking-tight"
            >
            Download <span class="text-primary-accent-color1 capitalize">{billType}</span>
          </Dialog.Title>

          <Dialog.Description class="AT_only">
              Downlaod your generated invoice 
          </Dialog.Description>

          <div class="flex flex-col md:flex-row justify-center items-center gap-9 pb-11 pt-7">
            <div class="w-40 relative">
                <slot />
                <img src={LoadingEllipse} width={140} height={140} loading="eager" aria-label="loading"  alt="" class={`top-0 bottom-0 z-10 w-20 filter-[] drop-shadow-xl left-0 right-0 m-auto absolute ${downloading ? "block" : "hidden"}`} />
            </div>
            <div class="flex justify-center items-center flex-col lg:items-start">
              <CustomButton
                on:click={() => downloadImage(false)}
                disabled={downloading}
                styles="p-[0] m-0 block underline text-center hover:text-primary-accent-color1 focus:outline-none focus:outline-offset-0"
              >
                Download
              </CustomButton>
              <CustomButton
                on:click={() => downloadImage(true)}
                href="/auth/sign_in"
                disabled={downloading}
                styles="p-[0] m-0 block underline text-center hover:text-emerald-500 mt-5 focus:outline-none focus:outline-offset-0"
              >
                Save In Draft
              </CustomButton>
            </div>
          </div>

          <Dialog.Close
            on:click={() => goto("/generate/invoice")}
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