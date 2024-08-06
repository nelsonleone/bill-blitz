<script lang="ts">
    import { Dialog } from "bits-ui";
    import Icon from "@iconify/svelte";
    import { fade, fly } from "svelte/transition";
    import type { IBasicInvoiceData } from "../../../types/types";
    import { getTemplate } from "$lib/helperFns/getTemplate";
    import { formatDateTime } from "$lib/helperFns/formatDate";
    import BlackWhiteMinimalist from "$lib/templates/templateAsComponents/BlackWhiteMinimalist.svelte";

    export let invoiceDetails: { invoice_data: IBasicInvoiceData, id: string, created_at: string }[] | null = [];

    $: showModal = invoiceDetails ? true : false;

    let Template: typeof BlackWhiteMinimalist | null = null;

    if (invoiceDetails && invoiceDetails[0].invoice_data.templateInUse) {
        Template = getTemplate(invoiceDetails[0].invoice_data.templateInUse)
        console.log(invoiceDetails[0].created_at)
    }


</script>


<Dialog.Root open={showModal} onOutsideClick={() => showModal = false}>
    <Dialog.Portal>
        <Dialog.Overlay
            transition={fade}
            transitionConfig={{ duration: 150 }}
            class="fixed inset-0 z-50 bg-black/70 justify-center items-center"
        />
        <Dialog.Content transition={fly} class="fixed bg-base-color1 pt-16 pb-8 left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-card-lg bg-background p-5 shadow-popover outline-none sm:max-w-[500px] md:w-full">
            {#if invoiceDetails}
                <div>
                    <div>
                        <p>Invoice created on: <span class="text-stone-700">{formatDateTime(invoiceDetails[0].created_at && invoiceDetails[0].created_at)}</span></p>
                        <p>Invoice Number: <span class="text-stone-700">{invoiceDetails[0].invoice_data.invoiceData.invoiceNumber}</span></p>
                        <p>Client Billed To: <span class="text-stone-700">{invoiceDetails[0].invoice_data.billTo.name}</span></p>

                        <div class="flex justify-around my-7">
                            <button class="text-primary-accent-color2 underline outline-none focus:outline focus:outline-2 focus:outline-primary-accent-color2">Download</button>
                            <button class="text-red-500 underline outline-none focus:outline focus:outline-2 focus:outline-red-500">Delete Invoice</button>
                        </div>
                    </div>
                </div>

                <Dialog.Close on:click={() => showModal = false} class="absolute right-5 lg:right-0 lg:top-0 text-primary-accent-color2 text-3xl -top-5 rounded-md active:scale-98 focus:outline-none focus:outline-offset-0">
                    <Icon icon="fa:close" />
                </Dialog.Close>
                {:else}
                <p>No Invoice With Specified Details Was Found</p>
            {/if}
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>