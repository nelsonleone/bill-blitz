<script lang="ts">
    import { getTemplate } from "$lib/helperFns/getTemplate";
    import BlueMinimalistBuilder from "$lib/templates/builder/BlueMinimalistBuilder.svelte";
    import BuilderIndicator from "$lib/templates/builder/BuilderIndicator.svelte";
    import WhiteSimpleBuilder from "$lib/templates/builder/WhiteSimpleBuilder.svelte";
    import { onMount } from "svelte";
    import { AlertSeverity, TemplateNames } from "../../../../enums";
    import { alertStore, editInvoiceDataStore, newInvoiceDataStore } from "../../../../store";
    import html2canvas from 'html2canvas';
    import BlackWhiteMinimalistBuilder from "$lib/templates/builder/BlackWhiteMinimalistBuilder.svelte";
    import DownloadBillModal from "$lib/components/prompts/DownloadBillModal.svelte";
    import { browser } from "$app/environment";
    import BlueMinimalist from "$lib/templates/templateAsComponents/BlueMinimalist.svelte";



    if (browser) {
        const isNewInvoiceDataStoreEmpty = !$newInvoiceDataStore || 
            (typeof $newInvoiceDataStore === "object" && Object.values($newInvoiceDataStore).length < 1) || 
            !$newInvoiceDataStore.templateInUse;
        
        if (isNewInvoiceDataStoreEmpty) {
            window.history.back()
        }
    }


    let building : boolean = true; 
    let showDownloadDialog : boolean = false; 
    let downloadUrl : string; 
    let downloading = false;
    let downloaded = false;
    
    $: editMode = !!$editInvoiceDataStore;

    $: editInvoiceData = $editInvoiceDataStore?.invoice_data!;

    async function captureSectionAsImage() {
        const section = document.getElementById("builder")

        if(section){
            const canvas = await html2canvas(section, {
                scale: 1,
                allowTaint : true,
                useCORS: true,
                scrollX: 0,
                scrollY: 0
            })
    
           
            setTimeout(() => {
                downloadUrl = canvas.toDataURL('image/png')
                building = false;
                showDownloadDialog = true;
            }, 3000)
        }

    }

    async function downloadImage(isDraft:boolean = false) {
        try{
            downloading = true;
            
            if(!downloaded){
                const result = await fetch("?/saveAndDownloadInvoice",{
                    method: "POST",
                    body: JSON.stringify({ isDraft, invoiceData: $newInvoiceDataStore, pngImg: downloadUrl })
                })

                if(!result.ok){
                    const { message } = await result.json()

                    throw new Error(message)
                }
            }
            
            const a = document.createElement('a')
            a.href = downloadUrl;
            a.download = 'invoice.png';
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)


            downloaded = true;

            alertStore.set({
                mssg: "Invoice downloaded",
                severity: AlertSeverity.SUCCESS
            })
        }

        catch(err:any|unknown){
            alertStore.set({
                mssg: err.message || "An error occurred while saving invoice, try again later",
                severity: AlertSeverity.ERROR
            })
        }

        finally{
            downloading = false;
        }
    }

    onMount(() => {
        captureSectionAsImage()

        return () => {
            newInvoiceDataStore.set(null)
            editInvoiceDataStore.set(null)
        }
    })

    let Template : typeof BlueMinimalist | null;


    if($newInvoiceDataStore?.templateInUse){
        Template = getTemplate($newInvoiceDataStore.templateInUse)
    }
</script>

<div class="page p-0 md:p-0 px-0 py-0 lg:px-0 lg:py-0 overflow-hidden">

    <div class="z-20 fixed top-0 bottom-0 left-0 right-0 m-auto h-full w-full bg-gray-100"></div>
    {#if building && Template}
        <BuilderIndicator>
            <svelte:component this={Template} noDetails />
        </BuilderIndicator>
        {:else if !building && showDownloadDialog}
        <DownloadBillModal billType="invoice" {downloadImage} {downloading}>
            <svelte:component this={Template} noDetails />
        </DownloadBillModal>
    {/if}

    <div class="flex justify-center">
        {#if $newInvoiceDataStore?.templateInUse ===  TemplateNames.WhiteSimple}
            <WhiteSimpleBuilder invoiceData={!editMode ? $newInvoiceDataStore : editInvoiceData} />
        {:else if  $newInvoiceDataStore?.templateInUse ===  TemplateNames.BlueMinimalist}
            <BlueMinimalistBuilder invoiceData={!editMode ? $newInvoiceDataStore : editInvoiceData} />
        {:else if $newInvoiceDataStore?.templateInUse ===  TemplateNames.BlackWhiteMinimalist}
            <BlackWhiteMinimalistBuilder invoiceData={!editMode ? $newInvoiceDataStore : editInvoiceData} />
        {/if}
    </div>
</div>