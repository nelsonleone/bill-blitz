<script lang="ts">
    import { Dialog } from "bits-ui";
    import { fade, scale } from "svelte/transition";
    import CustomButton from "../buttons/CustomButton.svelte";
    import LoadingEllipse from "../../statics-assets/loading-ellipse3.svg"
    import { createEventDispatcher } from "svelte";

    export let deletingAccount = false;
    export let showDeleteAccountPrompt : boolean;
    export let handleDeleteAccount : () => void;

    const dispatch = createEventDispatcher()
</script>

<Dialog.Root open={showDeleteAccountPrompt} closeOnOutsideClick={false}>
    <Dialog.Portal>
        <Dialog.Overlay
            transition={fade}
            transitionConfig={{ duration: 150 }}
            class="fixed inset-0 z-50 bg-black/80"
        />
        <Dialog.Content
            transition={scale}
            class="fixed left-[50%] top-[50%] z-50 lg:w-96 rounded-xl text-primary-dark-blue translate-x-[-50%] translate-y-[-50%] border bg-gray-100 p-5 pt-16 shadow-popover outline-none sm:max-w-[490px] md:px-10"
        >
            <Dialog.Title
            class="w-full text-center text-2xl font-rubik font-semibold tracking-tight"
            >
            Delete <span class="text-primary-accent-color3"> Account</span>
            </Dialog.Title>
            <Dialog.Description class="text-sm text-foreground-alt mt-3 font-overpass text-center lg:text-base">
                Are you sure you want to delete your account and all data
            </Dialog.Description>

            <img src={LoadingEllipse} width={140} height={140} loading="eager" aria-label="loading"  alt="" class={`top-0 bottom-0 z-10 w-20 filter-[] drop-shadow-xl left-0 right-0 m-auto absolute ${deletingAccount ? "block" : "hidden"}`} />

            <div class="flex justify-center gap-10 my-4">
                <CustomButton disabled={deletingAccount} on:click={handleDeleteAccount} styles="bg-primary-very-dark-blue text-base-color1 w-28 hover:bg-red-600">Delete</CustomButton>
                <CustomButton styles="bg-primary-very-dark-blue text-base-color1 w-28 hover:bg-green-600" on:click={() => dispatch("setShowDeleteAccountPrompt",false)}>Cancel</CustomButton>
            </div>
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>