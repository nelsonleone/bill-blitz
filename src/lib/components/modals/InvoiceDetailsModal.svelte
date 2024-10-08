<script lang="ts">
    import { Dialog } from "bits-ui";
    import Icon from "@iconify/svelte";
    import { fade, fly } from "svelte/transition";
    import type { ISavedInvoice } from "../../../types/types";
    import { getTemplate } from "$lib/helperFns/getTemplate";
    import { formatDateTime } from "$lib/helperFns/formatDate";
    import BlackWhiteMinimalist from "$lib/templates/templateAsComponents/BlackWhiteMinimalist.svelte";
    import { alertStore, editInvoiceDataStore } from "../../../store";
    import { AlertSeverity } from "../../../enums";
    import LoadingEllipse from "../../statics-assets/loading-ellipse3.svg"
    import IconButton from "../buttons/IconButton.svelte";
    import { goto } from "$app/navigation";

    export let invoiceDetails: ISavedInvoice[] | null = []
    export let handleDeleteInvoice : (id:string) => Promise<void>;

    $: showModal = invoiceDetails ? true : false;

    let Template: typeof BlackWhiteMinimalist | null = null;
    let deleting = false;

    $: createdDate = invoiceDetails ? new Date(invoiceDetails[0].created_at) : new Date()
    $: updatedDate = invoiceDetails ? new Date(invoiceDetails[0].updated_at) : new Date()
    const thresholdInMinutes = 1;
    const thresholdInMilliseconds = thresholdInMinutes * 60 * 1000;

    $: timeDifference = Math.abs(updatedDate.getTime() - createdDate.getTime())

    if (invoiceDetails && invoiceDetails[0].invoice_data.templateInUse) {
        Template = getTemplate(invoiceDetails[0].invoice_data.templateInUse)
    }


    const handleDownloadSavedInvoice = () => {
        if(invoiceDetails && invoiceDetails[0]){
            const a = document.createElement('a')
            a.href = invoiceDetails[0].pngImg;
            a.download = 'invoice.png';
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)

            alertStore.set({
                mssg: "Invoice downloaded",
                severity: AlertSeverity.SUCCESS
            })
        }else{
            alertStore.set({
                severity: AlertSeverity.ERROR,
                mssg: "An Error occurred"
            })
        }
    }

    const deleteInvoice = async(id:string) => {
        try{
            deleting = true;
            await handleDeleteInvoice(id)
        }
        catch(err:any){
            alertStore.set({
                severity: AlertSeverity.ERROR,
                mssg: err.message || "An Error occurred"
            })
        }
        finally{
            deleting = false;
        }
    } 


    const handleEditInvoice = (invoiceDetails:ISavedInvoice) => {
        editInvoiceDataStore.set(invoiceDetails)
        goto("/generate/invoice/edit")
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
                        {#if timeDifference > thresholdInMilliseconds}
                            <p>Last Updated On: <span class="text-stone-700">{formatDateTime(invoiceDetails[0].updated_at && invoiceDetails[0].updated_at)}</span></p>
                        {/if}
                        <p>Invoice Number: <span class="text-stone-700">{invoiceDetails[0].invoice_data.invoiceData.invoiceNumber}</span></p>
                        <p>Client Billed To: <span class="text-stone-700">{invoiceDetails[0].invoice_data.billTo.name}</span></p>

                        <div class="flex justify-around my-7">
                            <button on:click={handleDownloadSavedInvoice} class="text-primary-accent-color2 underline outline-none focus:outline focus:outline-2 focus:outline-primary-accent-color2 {invoiceDetails[0].is_draft ? "hidden" : "block"}">
                                Download
                            </button>
                            <button on:click={() => deleteInvoice(invoiceDetails[0].id)} class="text-red-500 underline max-w-48 p-0 flex items-center gap-2 outline-none focus:outline focus:outline-2 focus:outline-red-500">
                                <span>Delete Invoice</span>
                                <img src={LoadingEllipse} width={35} height={35} loading="eager" aria-label="deleting"  alt="" class={`drop-shadow-xl ${deleting ? "block" : "hidden"}`} />
                            </button>
                        </div>
                    </div>
                </div>

                <div class="absolute top-0 flex justify-between w-full left-0 items-center">
                    <IconButton on:click={() => handleEditInvoice(invoiceDetails[0])} styles="p-0 bg-transparent text-4xl flex items-center gap-1 text-orange-600">
                        <Icon icon="flowbite:edit-solid" />
                        <span class="text-sm">Edit</span>
                    </IconButton>
                    <Dialog.Close on:click={() => showModal = false} class="text-primary-accent-color2 mx-3 -translate-y-10 text-3xl -top-5 rounded-md active:scale-98 focus:outline-none focus:outline-offset-0">
                        <Icon icon="fa:close" />
                    </Dialog.Close>
                </div>

                {:else}
                <p>No Invoice With Specified Details Was Found</p>
            {/if}
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>