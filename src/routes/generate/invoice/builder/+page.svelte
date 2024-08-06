<script lang="ts">
    import { getTemplate } from "$lib/helperFns/getTemplate";
    import BlueMinimalistBuilder from "$lib/templates/builder/BlueMinimalistBuilder.svelte";
    import BuilderIndicator from "$lib/templates/builder/BuilderIndicator.svelte";
    import WhiteSimpleBuilder from "$lib/templates/builder/WhiteSimpleBuilder.svelte";
    import { onMount } from "svelte";
    import { AlertSeverity, TemplateNames } from "../../../../enums";
    import { alertStore, newInvoiceDataStore } from "../../../../store";
    import puppeteer, { ElementHandle } from 'puppeteer-core';
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

    async function captureSectionAsImage() {
        try {
            const response = await fetch("/saveAndDownloadInvoice", {
                method: "POST",
                body: JSON.stringify({ invoiceData: $newInvoiceDataStore }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const { message } = await response.json();
                throw new Error(message);
            }

            const { pngImg } = await response.json();
            downloadUrl = pngImg; // Set the download URL for the image

            alertStore.set({
                mssg: "Invoice downloaded",
                severity: AlertSeverity.SUCCESS
            })
        } catch (err:any|unknown) {
            alertStore.set({
                mssg: err.message || "An error occurred while capturing the image, try again later",
                severity: AlertSeverity.ERROR
            })
        }
    }

    async function downloadImage(isDraft:boolean = false) {
        try{
            downloading = true;
            const result = await fetch("?/saveAndDownloadInvoice",{
                method: "POST",
                body: JSON.stringify({ isDraft, invoiceData: $newInvoiceDataStore, downloadUrl })
            })

            if(!result.ok){
                const { message } = await result.json()

                throw new Error(message)
            }
            
            const a = document.createElement('a')
            a.href = downloadUrl;
            a.download = 'invoice.png';
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)

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
            <Template noDetails />
        </BuilderIndicator>
        {:else if !building && showDownloadDialog}
        <DownloadBillModal billType="invoice" {downloadImage} {downloading}>
            <Template noDetails />
        </DownloadBillModal>
    {/if}

    <div class="flex justify-center">
        {#if $newInvoiceDataStore?.templateInUse ===  TemplateNames.WhiteSimple}
            <WhiteSimpleBuilder invoiceData={$newInvoiceDataStore} />
        {:else if  $newInvoiceDataStore?.templateInUse ===  TemplateNames.BlueMinimalist}
            <BlueMinimalistBuilder invoiceData={$newInvoiceDataStore} />
        {:else if $newInvoiceDataStore?.templateInUse ===  TemplateNames.BlackWhiteMinimalist}
            <BlackWhiteMinimalistBuilder invoiceData={$newInvoiceDataStore} />
        {/if}
    </div>
</div>