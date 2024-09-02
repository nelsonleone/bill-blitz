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



    let editMode = $editInvoiceDataStore ? true : false;

    let invoiceData = editMode ? $editInvoiceDataStore?.invoice_data! : $newInvoiceDataStore!;

    let selectedTemplate = invoiceData?.templateInUse;


    if (browser) {
        if(!invoiceData || typeof invoiceData !== "object" || !selectedTemplate){
            window.history.back()
        }
    }


    let building : boolean = true; 
    let showDownloadDialog : boolean = false; 
    let downloadUrl : string; 
    let downloading = false;
    let downloaded = false;
    let edittedWithoutErrs : null | boolean = null;

    async function captureSectionAsImage() {
        if(browser) {
            if(screen.width < 1020)
            document?.getElementById("viewport")?.setAttribute("content", "width=1200px")
        }
        const section = document.getElementById("builder")

        if(section){           
            setTimeout(async() => {
                const canvas = await html2canvas(section, {
                    allowTaint : true,
                    scrollX: 0,
                    scale: 3,
                    scrollY: 0
                })

                downloadUrl = canvas.toDataURL('image/png')
                building = false;
                showDownloadDialog = true;
        
                if(screen.width < 1024) {
                    document?.getElementById("viewport")?.setAttribute("content", "width=device-width, initial-scale=1")
                }
            }, 3000)
        }
    }

    async function downloadImage(isDraft:boolean = false, shouldDownload: boolean = true) {
        try{
            downloading = true;
            
            if(!downloaded){

                let result;

                if(editMode){
                    result = await fetch("?/editInvoice",{
                        method: "POST",
                        body: JSON.stringify({ isDraft, invoiceData, invoiceId: $editInvoiceDataStore?.id, pngImg: downloadUrl })
                    })
                }else{
                    result = await fetch("?/saveAndDownloadInvoice",{
                        method: "POST",
                        body: JSON.stringify({ isDraft, invoiceData, pngImg: downloadUrl })
                    })
                }

                if(!result.ok){
                    const { message } = await result.json()
                    edittedWithoutErrs = false;
                    throw new Error(message)
                }

                edittedWithoutErrs = true;
            }

            if (shouldDownload){
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
            else if(!shouldDownload && editMode){
                alertStore.set({
                    mssg: "Invoice Editted",
                    severity: AlertSeverity.SUCCESS
                })
            }
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

    if(selectedTemplate){
        Template = getTemplate(selectedTemplate)
    }
</script>

<div class="page p-0 md:p-0 px-0 py-0 lg:px-0 lg:py-0 overflow-hidden">

    <div class="z-20 fixed top-0 bottom-0 left-0 right-0 m-auto h-full w-full bg-gray-100"></div>
    {#if building && Template}
        <BuilderIndicator />
        {:else if !building && showDownloadDialog}
        <DownloadBillModal billType="invoice" {downloadImage} {edittedWithoutErrs} {downloaded} {downloading}>
            <svelte:component this={Template} noDetails />
        </DownloadBillModal>
    {/if}

    <div class="flex justify-center">
        {#if selectedTemplate === TemplateNames.WhiteSimple}
            <WhiteSimpleBuilder invoiceData={invoiceData} />
        {:else if selectedTemplate === TemplateNames.BlueMinimalist}
            <BlueMinimalistBuilder invoiceData={invoiceData} />
        {:else if selectedTemplate === TemplateNames.BlackWhiteMinimalist}
            <BlackWhiteMinimalistBuilder invoiceData={invoiceData} />
        {/if}
    </div>
</div>