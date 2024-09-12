<script lang="ts">
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import CompanyLogoUpload from "$lib/components/inputs/CompanyLogoUpload.svelte";
    import DatePicker from "$lib/components/inputs/DatePicker.svelte";
    import InvoiceFormInput from "$lib/components/inputs/InvoiceFormInput.svelte";
    import { Checkbox, Label, Separator } from "bits-ui";
    import type { IBasicInvoiceData, ICurrency, InvoiceFormSubmitError, InvoiceItems, ValidationErrors } from "../../../types/types"
    import Icon from "@iconify/svelte";
    import InvoiceFormItem from "$lib/components/invoice/InvoiceFormItem.svelte";
    import CurrenciesSelect from "$lib/components/invoice/CurrenciesSelect.svelte";
    import { validateInputs } from "$lib/helperFns/formValidator";
    import CurrencyIcon from "$lib/components/invoice/CurrencyIcon.svelte";
    import { calculateInvoiceTotal } from "$lib/helperFns/calculateInvoiceTotal";
    import { generateInvoiceNumber } from "$lib/helperFns/generateInvoiceNumber";
    import IconButton from "$lib/components/buttons/IconButton.svelte";
    import CustomTooltip from "$lib/components/prompts/CustomTooltip.svelte";
    import { setFooterText } from "$lib/helperFns/setInvoiceFooterText";
    import InvoiceItemsTable from "$lib/components/invoice/InvoiceItemsTable.svelte";
    import { alertStore, editInvoiceDataStore } from "../../../store";
    import Signature from "$lib/components/inputs/Signature.svelte";
    import SignaturePad from "$lib/components/inputs/SignaturePad.svelte";
    import { setEmptyValidationErrors, validateInvoiceFormData } from "$lib/helperFns/handleInvoiceFormDataCheck";
    import { goto } from "$app/navigation";
    import { scale } from "svelte/transition";
    import { elasticIn } from "svelte/easing";
    import parsePhoneNumber from 'libphonenumber-js'
    import { AlertSeverity, TemplateNames } from "../../../enums";
    import ErrorPara from "$lib/components/prompts/ErrorPara.svelte";
    import { createEventDispatcher } from "svelte";
    import { getCurrencyByValue } from "$lib/componentsData/currenciesArray";
    import { CalendarDate, type DateValue } from "@internationalized/date";
    
    export let templateInUse;
    
    let invoiceItemsArr: InvoiceItems[] = $editInvoiceDataStore?.invoice_data.invoiceData.items || [];
    let issuerEmail: string = ($editInvoiceDataStore?.invoice_data?.issuer.contactInfo?.emailAddress || "")
    let signature: { path: string; width: number; height: number }[] = $editInvoiceDataStore?.invoice_data.signature || [];
    let issuerName: string = ($editInvoiceDataStore?.invoice_data?.issuer.name || "")
    let logo: string = ($editInvoiceDataStore?.invoice_data?.logo || "")
    let issuerAddress: string = ($editInvoiceDataStore?.invoice_data?.issuer.contactInfo?.address || "")
    let customerEmail: string = ($editInvoiceDataStore?.invoice_data?.billTo.contactInfo?.emailAddress || "")
    let customerName: string = ($editInvoiceDataStore?.invoice_data?.billTo.name || "")
    let customerAddress: string = ($editInvoiceDataStore?.invoice_data?.billTo.contactInfo?.address || "")
    let issuerPhoneNumber: string = ($editInvoiceDataStore?.invoice_data?.issuer.contactInfo?.phoneNumber || "")
    let customerPhoneNumber: string = ($editInvoiceDataStore?.invoice_data?.billTo.contactInfo?.phoneNumber || "")
    let currency: ICurrency = (getCurrencyByValue($editInvoiceDataStore?.invoice_data?.currency!))
    let logoText: string = ($editInvoiceDataStore?.invoice_data?.logoText || '')
    let tax: number = ($editInvoiceDataStore?.invoice_data?.tax || 0)
    let subTotal: number = ($editInvoiceDataStore?.invoice_data?.subTotal || 0)
    let total: number = ($editInvoiceDataStore?.invoice_data?.total || 0)
    let discount: number = ($editInvoiceDataStore?.invoice_data?.discount || 0)
    let accountDetails: string = ($editInvoiceDataStore?.invoice_data?.accountDetails || '')
    let date: string;
    

    $: {
        if(useAutoTotalCalc){
            total =  calculateInvoiceTotal(invoiceItemsArr,discount,tax).total;
            subTotal =  calculateInvoiceTotal(invoiceItemsArr,discount,tax).subTotal;
        }
    }

    $: {
        for (let key in formInputData) {
            if (formInputData[key as keyof IBasicInvoiceData]) {
               if(key === "issuer"){
                  for(let key in formInputData.issuer?.contactInfo){
                        if(formInputData.issuer?.contactInfo[key as keyof object] && errors?.issuerContactInfo?.message){
                            errors.issuerContactInfo.message = ""
                        }
                    }
                    if(formInputData.issuer?.name && errors?.issuer?.message){
                        errors.issuer.message = "";
                    }
                }

               else if (key === "billTo"){
                  for(let key in formInputData.billTo?.contactInfo){
                        if(formInputData.billTo?.contactInfo[key as keyof object] && errors?.billToContactInfo?.message){
                            errors.billToContactInfo.message = ""
                        }
                    }
                    if(formInputData.billTo?.name && errors?.billToName?.message){
                        errors.billToName.message = "";
                    }
               }

                else if (key === "total" && formInputData.total && errors?.total?.message){
                    errors.total.message = ""
                }
                else if (key === "invoiceData" && formInputData.invoiceData?.date && errors?.date?.message){
                    errors.date.message = ""
                }
                else if (key === "invoiceData" && formInputData.invoiceData?.invoiceNumber && errors?.invoiceNumber?.message){
                    errors.invoiceNumber.message = ""
                }
                else if (key === "invoiceData" && formInputData.invoiceData?.items.length && errors?.items?.message){
                    errors.items.message = ""
                }
                else if (key === "logo" || key === "logoText")
                  if((formInputData.logo || formInputData.logoText) && errors?.logo?.message){
                    errors.logo.message = ""
                }
            }
        }
    }


    let includeBankDetails = $editInvoiceDataStore?.invoice_data.accountDetails ? true : false;
    let useAutoTotalCalc = false;
    let includeTax = $editInvoiceDataStore?.invoice_data.tax !== undefined && $editInvoiceDataStore?.invoice_data.tax !== null;
    let includesubTotal = $editInvoiceDataStore?.invoice_data.subTotal !== undefined && $editInvoiceDataStore?.invoice_data.subTotal !== null;
    let includeDiscount = $editInvoiceDataStore?.invoice_data.discount !== undefined && $editInvoiceDataStore?.invoice_data.discount !== null;
    let editFooterText = $editInvoiceDataStore?.invoice_data.footerText ? true : false;
    let invoiceNumber : string = $editInvoiceDataStore?.invoice_data.invoiceData.invoiceNumber || "";
    let includeSignature = $editInvoiceDataStore?.invoice_data.signature && $editInvoiceDataStore?.invoice_data.signature?.length > 0 ? true : false;
    let formInputData : IBasicInvoiceData;
        
    const dispatch = createEventDispatcher()
        
        
    $: openSignaturePad = false;

    $: formInputData = {
        issuer: {
            name: issuerName,
            contactInfo: {
                emailAddress: issuerEmail,
                address: issuerAddress,
                phoneNumber: issuerPhoneNumber
            }
        },
        invoiceData: {
            invoiceNumber,
            date: date || new Date(), // Default to today's date
            items: invoiceItemsArr
        },
        billTo: {
            name: customerName,
            contactInfo: {
                emailAddress: customerEmail,
                address: customerAddress,
                phoneNumber: customerPhoneNumber
            }
        },
        currency: currency?.value || "USD",
        templateInUse,
        logoText,
        logo,
        total,
        subTotal,
        tax,
        signature,
        accountDetails,
        discount,
        footerText: setFooterText(issuerEmail || issuerPhoneNumber || "")
    }


    const handleShowOpenSignaturePad = () => {
        if(openSignaturePad){
            includeSignature = false;
        }
        openSignaturePad = false;
    }

    let errors : InvoiceFormSubmitError;
    /** @type any */
    let itemsErrors : ValidationErrors;


    const handleAddItem = () => {
        // Check if there are any items in the array
        const lastItem = invoiceItemsArr[invoiceItemsArr.length - 1]
        if (invoiceItemsArr.length > 0) {

            // Validate the last item's properties
            itemsErrors = validateInputs([
            {
                name: "description",
                value: lastItem.description,
                rules: {
                required: "Please enter item description"
                }
            },
            {
                name: "price",
                value: lastItem.price,
                rules: {
                    required: "Enter item price",
                    min: {
                        value: 1,
                        message: "Please enter a valid price"
                    }
                }
            },
            {
                name: "amount",
                value: lastItem.amount,
                rules: {
                    required: "Enter item amount",
                    min: {
                        value: 1,
                        message: "Please enter a valid amount"
                    }
                }
            }
            ])  
        }

        const errorMessagesArr = itemsErrors
        ? Object.values(itemsErrors).map(val => val?.message && val.message)
        : [] 


        // Check if there are any errors
        if (errorMessagesArr.length > 0) {
            return;
        }

        if(lastItem && !lastItem.saved){
            // Save Current Item
            const newInvoiceItemsArr = invoiceItemsArr.map(val => {
                return {...val, saved: true }
            })
            invoiceItemsArr = newInvoiceItemsArr
        }
        else if(invoiceItemsArr.length === 0 || (lastItem && lastItem.saved)){
            // Add a new item slot to the array
            invoiceItemsArr = [...invoiceItemsArr, { amount: undefined, description: "", price: undefined, quantity: 1, saved: false }];
        }
    }
    




    

    //Used Any Type Because [name and value] as exist on type Event
    const clearErrorOnInputChange = (e:any) => {
        if(itemsErrors && itemsErrors[e.currentTarget?.name]?.message){
            itemsErrors[e.currentTarget?.name].message = "";
        }
    }


    const handleCancelCreation = () => {
        formInputData.signature = []
        goto("/generate/invoice/new")
    }



    //
    const setItemsInputValues = (e:any,index:number) => {

        const { name, value } = e.currentTarget;

        invoiceItemsArr = invoiceItemsArr.map((item,i) => {
            return index === i ? {...item, [name]: value} : item
        })
    }





    const handleRemoveItem = (index:number) => {
        invoiceItemsArr = invoiceItemsArr.filter((_,i) => i !== index)
    }

    const handleFormatPhoneNumber = (phoneFor:"customer" | "issuer") => {
        if(phoneFor === "customer"){
            customerPhoneNumber = parsePhoneNumber(customerPhoneNumber)?.formatInternational() || customerPhoneNumber;
        }
        else if(phoneFor === "issuer"){
            issuerPhoneNumber = parsePhoneNumber(issuerPhoneNumber)?.formatInternational() || issuerPhoneNumber;
        }
        
    }


    $: {
        if((formInputData.logo || formInputData.logoText) && errors){
            errors.logo.message = ""
        }
    }



    // Submit Handler

    const handleSubmit = async(e: { currentTarget: EventTarget & HTMLFormElement}) => {
        const { isValid, validationErrors } = validateInvoiceFormData(formInputData)


        if(!isValid && validationErrors){
            errors = validationErrors;

            alertStore.set({
                severity: AlertSeverity.ERROR,
                mssg: "Fix The Errors To Continue"
            })

            return;
        }

        try{
            dispatch("setSubmitting",true)
            
            const res = await fetch(e.currentTarget.action,{
                method: "POST",
                body: JSON.stringify(formInputData)
            })

            if(res.ok){
                const pngImg = $editInvoiceDataStore?.pngImg!;
                const created_at = $editInvoiceDataStore?.created_at!;
                const id = $editInvoiceDataStore?.id!;

                editInvoiceDataStore.set({ 
                    pngImg, 
                    created_at,
                    id,
                    is_draft: false,
                    invoice_data: formInputData,
                    updated_at: ""
                })

                goto("/generate/invoice/builder")
            }
        }
        catch(err : any | unknown){
            alertStore.set({
                severity: AlertSeverity.ERROR,
                mssg: err.message || "An error occurred, try again"
            })
        }
        finally{
            dispatch("setSubmitting",false)
        }
    }

</script>

<form in:scale={{ duration: 1000, delay: 2000, easing: elasticIn }} method="post" action="?/setInvoiceData" id="invoice-form" on:submit|preventDefault={handleSubmit} class="bg-base-color1 w-full shadow-md py-12 px-4 md:px-12 mt-16">
    <div class="mb-4">
        <CurrenciesSelect bind:currency={currency} />
    </div>
    <div class="relative flex flex-col justify-end md:items-end">
        <h2 class="hidden md:block -rotate-90 text-7xl tracking-wide text-primary-accent-color2 absolute left-0 top-96 md:top-0 z-0 bottom-0 my-auto opacity-40 font-overpass w-fit h-fit">INVOICE</h2>
            <CompanyLogoUpload uploadedLogo={formInputData.logo} on:setUploadedLogo={(e) => logo = e.detail} />
            <div class="self-end text-right  text-stone-700 mt-4">
                <p class="text-sm text-stone-700 my-3">If Logo Does Not Contain Enterprise Name And You Wish To Add It</p>
            <InvoiceFormInput 
                name="logoText" 
                id="logoText" 
                inputType="text" 
                placeholder="Enter logo alternative text" 
                label="Logo Alternative:" 
                labelStyles="block"
                bind:value={logoText}
                containerStyles="mb-0"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
            <ErrorPara styles="text-right justify-end" error={errors?.logo?.message} />
           
           
            <InvoiceFormInput 
                name="issuer.name" 
                id="enterprise-name" 
                inputType="text" 
                placeholder="Enter Enterprise name" 
                label="Enterprise Name:" 
                labelStyles="block"
                bind:value={issuerName}
                containerStyles="mt-8 mb-0"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
            <ErrorPara styles="text-right justify-end" error={errors?.issuer?.message} />
           
           
            <div>
                <h3 class="my-4 font-semibold text-primary-accent-color2 text-lg underline">Contact Info</h3>
                <InvoiceFormInput 
                    name="issuer.contactInfo.address" 
                    on:keyup={() => setEmptyValidationErrors()}
                    id="enterprise-address" 
                    inputType="textArea" 
                    placeholder="Enter Enterprise address" 
                    label="Enterprise Address:" 
                    labelStyles="block"
                    bind:value={issuerAddress}
                    inputStyles="md:w-80 bg-stone-100 font-barlow max-w-64 p-4 border border-gray-500 rounded-md focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                />
                <div class="relative">
                    <p class="mb-2 text-primary-accent-color1 text-sm underline">Optional Fields</p>
                    <div class="absolute right-72 h-1/2 w-1 bg-stone-300 bottom-8 md:right-[21em]"></div>
                    <InvoiceFormInput 
                        name="issuer.contactInfo.email" 
    
                        id="enterprise-email" 
                        inputType="text" 
                        placeholder="Enter Enterprise email" 
                        label="Enterprise Email:" 
                        labelStyles="block"
                        bind:value={issuerEmail}
                        inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                        containerStyles="m-0"
                    />
                    <InvoiceFormInput 
                        name="issuer.contactInfo.phoneNumber" 
    
                        id="billToEnterprise-phone" 
                        inputType="text" 
                        placeholder="Enter Enterprise phone" 
                        label="Enterprise Phone:" 
                        labelStyles="block"
                        bind:value={issuerPhoneNumber}
                        on:input={() => handleFormatPhoneNumber("issuer")}
                        inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                    />
                </div>
            </div>
        </div>
        <ErrorPara error={errors?.issuerContactInfo?.message} />
    </div>
    <Separator.Root
        class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    />
    <div class="">
        <div>
            <div>
                <InvoiceFormInput 
                    name="invoiceData.invoiceNumber" 
                    id="invoice-number" 
                    inputType="text" 
                    placeholder="e.g 0001" 
                    label="Invoice Number:"
                    bind:value={invoiceNumber}
                    labelStyles="block"
                    containerStyles="mb-[.7em]"
                    inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                />
                <CustomButton styles="bg-stone-700 py-3 focus:outline focus:outline-2 focus:outline-emerald-700 focus:bg-transparent focus:text-stone-700 hover:shadow-md transition duration-200 ease-in-out" on:click={() => invoiceNumber = generateInvoiceNumber()}>Generate</CustomButton>
                <ErrorPara error={errors?.invoiceNumber?.message} />
            </div>
            <div class="flex items-end justify-end mt-8 flex-col">
                <ErrorPara error={errors?.date.message} styles=""  />
                <DatePicker bind:value={date} on:setDate={(e) => {

                    formInputData = {...formInputData, invoiceData: {
                        ...formInputData.invoiceData,
                        invoiceNumber: formInputData.invoiceData?.invoiceNumber || "",
                        date: e.detail,
                        items: formInputData.invoiceData?.items || []
                    }}  


                    if(errors){
                        errors.date.message = ""
                    }
                }} />
            </div>
        </div>

        <Separator.Root
            class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
        /> 

        <div class="mt-16">
            <p class="font-medium mb-3 text-xl">Bill To</p>
            <InvoiceFormInput 
                name="billTo.name" 
                id="billTo-CustomerName" 
                inputType="text" 
                placeholder="e.g Example customer" 
                label="Customer Name:"
                bind:value={customerName} 
                labelStyles="block"
                containerStyles="my-4"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
            <ErrorPara error={errors?.billToName?.message} />
            <h3 class="my-4 font-semibold text-primary-accent-color2 text-lg underline">Contact Info</h3>
            <InvoiceFormInput 
                name="billTo.contactInfo.address" 
                id="billTo-CustomerAddress" 
                inputType="textArea" 
                placeholder="e.g no.5 customer address street" 
                label="Customer Address:" 
                bind:value={customerAddress} 
                labelStyles="block my-4"
                containerStyles=""
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
        </div>
    
        <div class="relative">
            <p class="mb-2 text-primary-accent-color1 text-sm underline">Optional Fields</p>
            <div class="absolute left-72 h-1/2 w-1 bg-stone-300 bottom-8 md:left-[21em]"></div>
            <InvoiceFormInput 
                name="billTo.contactInfo.email" 
                id="billToCustomer-email" 
                inputType="text" 
                placeholder="Enter Customer email" 
                label="Customer Email:" 
                bind:value={customerEmail} 
                labelStyles="block"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                containerStyles="m-0"
            />
            <InvoiceFormInput 
                name="billTo.contactInfo.phoneNumber" 
                id="customer-phone" 
                inputType="text" 
                bind:value={customerPhoneNumber}
                on:input={() => handleFormatPhoneNumber("customer")}
                placeholder="Enter customer phone" 
                label="Customer Phone:" 
                labelStyles="block"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
        </div>
        <ErrorPara error={errors?.billToContactInfo?.message} />
    </div>

    <Separator.Root
        class="my-8 lg:my-16 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    /> 

    <div>
        <h2 class="font-medium text-xl mb-4">Items</h2>
        {#if invoiceItemsArr?.length > 0 && invoiceItemsArr[0]?.saved}
            <InvoiceItemsTable {handleRemoveItem} currency={formInputData.currency} {invoiceItemsArr} />
        {/if}
       {#if invoiceItemsArr?.length}
         {#each invoiceItemsArr as item, i (i)}
            {#if item}
                <InvoiceFormItem {handleRemoveItem} errors={itemsErrors} setItemsInputValues={setItemsInputValues}  {...item} index={i} clearErrors={clearErrorOnInputChange} />
            {/if}
         {/each}
       {:else}
         <p class="text-sm text-primary-accent-color2">You Haven't Added Any Item Yet</p>
       {/if}

       <ErrorPara error={errors?.items?.message} />

       <CustomButton on:click={handleAddItem} styles="bg-stone-600 lg:mt-8 shadow-sm flex gap-2 items-center py-3 focus:outline focus:outline-2 focus:outline-emerald-700 focus:bg-transparent focus:text-stone-700 hover:shadow-md transition duration-200 ease-in-out">
         <span>Add</span>
         <Icon icon="fluent:copy-add-24-filled" class="text-2xl" aria-label="add" />
       </CustomButton>
    </div>


    <div>
        <div class="mt-10 flex items-center gap-3">
            <Checkbox.Root
              id="includeTax"
              aria-labelledby="includeTax-label"
              class="peer inline-flex size-[25px] items-center justify-center rounded-md border border-stone-500 bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
              bind:checked={includeTax}
            >
              <Checkbox.Indicator
                let:isChecked
                let:isIndeterminate
                class="inline-flex items-center justify-center text-background"
              >
                {#if isChecked}
                    <Icon icon="mingcute:check-2-fill" />
                {:else if isIndeterminate}
                    <Icon icon="fluent-emoji-flat:minus" />
                {/if}
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Label.Root
              id="includeTax-label"
              for="terms"
              class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include Taxes
            </Label.Root>
        </div>
        
        <div class="flex mt-3 items-center gap-3">
            <Checkbox.Root
              id="includeDiscount"
              aria-labelledby="includeDiscount-label"
              class="peer inline-flex size-[25px] items-center justify-center rounded-md border border-stone-500 bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
              bind:checked={includeDiscount}
            >
              <Checkbox.Indicator
                let:isChecked
                let:isIndeterminate
                class="inline-flex items-center justify-center text-background"
              >
                {#if isChecked}
                    <Icon icon="mingcute:check-2-fill" />
                {:else if isIndeterminate}
                    <Icon icon="fluent-emoji-flat:minus" />
                {/if}
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Label.Root
              id="includeDiscount-label"
              for="includeDiscount"
              class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include Discount
            </Label.Root>
        </div>

        <div class="mt-3 flex items-center gap-3">
            <Checkbox.Root
              id="includesubTotal"
              aria-labelledby="includesubTotal-label"
              class="peer inline-flex size-[25px] items-center justify-center rounded-md border border-stone-500 bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
              bind:checked={includesubTotal}
            >
              <Checkbox.Indicator
                let:isChecked
                let:isIndeterminate
                class="inline-flex items-center justify-center text-background"
              >
                {#if isChecked}
                    <Icon icon="mingcute:check-2-fill" />
                {:else if isIndeterminate}
                    <Icon icon="fluent-emoji-flat:minus" />
                {/if}
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Label.Root
              id="includesubTotal-label"
              for="includesubTotal"
              class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include Sub Total
            </Label.Root>
        </div>


        <div class="mx-auto mt-6 flex flex-col bg-emerald-800 text-base-color1 py-4 px-2 rounded-sm md:w-96 md:mx-auto">  
            
            {#if includeTax}
                <div class="flex items-center justify-between my-2">
                    <h3 id="sub-total" class="text-base text-nowrap font-semibold font-barlow uppercase ms-2">
                        Tax Percentage:
                    </h3>
                    <InvoiceFormInput 
                        name="tax" 
    
                        id={`invoiceItems-tax`}
                        inputType="number"
                        bind:value={tax}
                        placeholder="Enter tax percentage" 
                        label="Tax Value"
                        labelStyles="AT_only" 
                        containerStyles="col-span-3 mb-[0]"
                        inputStyles="w-[95%] text-stone-700 text-primary-very-dark-blue w-full rounded-sm p-3 h-10 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                    />
                </div>
            {/if}
            
            {#if includeDiscount}
                <div class="flex items-center justify-between my-2">
                    <h3 id="sub-total" class="text-base text-nowrap font-semibold font-barlow uppercase ms-2">
                        Discount:
                    </h3>
                    <div class="flex justify-center items-center">
                        <strong>
                            <CurrencyIcon styles="text-xl me-1 opacity-70" currency={formInputData.currency} />
                        </strong>
                        <InvoiceFormInput 
                            name="discount" 
        
                            id={`invoiceItems-discount`}
                            inputType="number"
                            bind:value={discount}
                            placeholder="Enter invoice discount" 
                            label="Service or Package Discount"
                            labelStyles="AT_only" 
                            containerStyles="col-span-3 mb-[0]"
                            inputStyles="w-[95%] text-stone-700 text-primary-very-dark-blue w-full rounded-sm p-3 h-10 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                        />
                    </div>
                </div>
            {/if}
            {#if includesubTotal}
                <div class="flex justify-between my-2 items-center">
                    <h3 id="sub-total" class="text-base text-nowrap font-semibold font-barlow uppercase ms-2">
                        Sub Total:
                    </h3>
                    <div class="flex justify-center items-center">
                        <strong>
                            <CurrencyIcon styles="text-xl me-1 opacity-70" currency={formInputData.currency} />
                        </strong>
                        <InvoiceFormInput 
                            name="subTotal" 
        
                            id={`invoiceItems-sub-total`}
                            inputType="number"
                            bind:value={subTotal}
                            placeholder="Enter invoice sub-total" 
                            label="Invoice items sub-total"
                            labelStyles="AT_only" 
                            containerStyles="col-span-3 mb-[0]"
                            inputStyles="w-[95%] text-stone-700 text-primary-very-dark-blue w-full rounded-sm p-3 h-10  focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                        />
                    </div>
                </div>
            {/if}
            <div class="flex justify-between items-center my-2">
                <h3 id="total" class="text-xl font-semibold font-barlow uppercase ms-2">
                    Total:
                </h3>
                <div class="flex justify-center items-center">
                    <strong>
                        <CurrencyIcon styles="text-xl text-center me-1 opacity-70" currency={formInputData.currency} />
                    </strong>
                    <InvoiceFormInput 
                        name="total" 
    
                        id={`invoiceItems-total`}
                        inputType="number"
                        placeholder="Enter invoice total" 
                        label="Invoice items total"
                        bind:value={total}
                        labelStyles="AT_only" 
                        containerStyles="col-span-3 mb-[0]"
                        inputStyles="w-[95%] text-stone-700 text-primary-very-dark-blue w-full rounded-sm p-3 h-10 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                    />
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center gap-3 mt-3 border border-stone-300 shadow-md w-fit mx-auto p-4 rounded-md">
            <Checkbox.Root
              id="useAutoTotalCalc"
              disabled={!invoiceItemsArr.length}
              aria-labelledby="useAutoTotalCalc-label"
              class="peer inline-flex size-[25px] disabled:hover:cursor-not-allowed items-center justify-center rounded-md border border-stone-500 bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
              bind:checked={useAutoTotalCalc}
            >
              <Checkbox.Indicator
                let:isChecked
                let:isIndeterminate
                class="inline-flex items-center justify-center text-background"
              >
                {#if isChecked}
                    <Icon class="text-emerald-700" icon="mingcute:check-2-fill" />
                {:else if isIndeterminate}
                    <Icon class="text-emerald-700" icon="fluent-emoji-flat:minus" />
                {/if}
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Label.Root
              id="useAutoTotalCalc-label"
              for="useAutoTotalCalc"
              class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Use Auto Calc
            </Label.Root>
        </div>
        <ErrorPara error={errors?.total?.message} />
    </div>

    
    {#if templateInUse !== TemplateNames.BlueMinimalist}
        <Separator.Root
            class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
        /> 

        <div class="text-stone-700 ">
            <div class="mt-10 flex items-center gap-3">
                <Checkbox.Root
                id="includeBankDetails"
                aria-labelledby="includeBankDetails-label"
                class="peer inline-flex size-[25px] items-center justify-center rounded-md border border-stone-500 bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
                bind:checked={includeBankDetails}
                >
                <Checkbox.Indicator
                    let:isChecked
                    let:isIndeterminate
                    class="inline-flex items-center justify-center text-background"
                >
                    {#if isChecked}
                        <Icon icon="mingcute:check-2-fill" />
                    {:else if isIndeterminate}
                        <Icon icon="fluent-emoji-flat:minus" />
                    {/if}
                </Checkbox.Indicator>
                </Checkbox.Root>
                <Label.Root
                id="includeBankDetails-label"
                for="includeBankDetails"
                class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                Include Bank Details
                </Label.Root>
            </div>

            {#if includeBankDetails}
                <InvoiceFormInput 
                    name="accountDetails" 
                    id="bank-details"
                    inputType="textArea"
                    placeholder="Example bank\n12345679\nExample name" 
                    label="Bank Account Details:"
                    labelStyles="block" 
                    containerStyles="col-span-3 mb-[0] my-4"
                    bind:value={accountDetails}
                    inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                />
                <p class="font-rubik text-sm text-primary-accent-color2">Break into new lines after each detail</p>
            {/if}
        </div>
    {/if}

    
    
    {#if templateInUse !== TemplateNames.BlueMinimalist && templateInUse !== TemplateNames.WhiteSimple}
        <Separator.Root
            class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
        /> 

        <div>
            <div class="mt-10 relative flex justify-center mx-auto max-w-80">
                <InvoiceFormInput 
                    name="footerText" 
                    id="footer-text"
                    inputType="textArea"
                    placeholder="" 
                    label="Help Information"
                    bind:value={formInputData.footerText}
                    labelStyles="AT_only"
                    readOnly={!editFooterText} 
                    containerStyles="mt-4 mb-[0]"
                    inputStyles="w-[100%] bg-stone-100 border min-h-[5.3em] h-[5.4em] border-gray-500 read-only:opacity-40 rounded-md p-4 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                />
                
                <CustomTooltip tooltipMssg="Edit" styles="absolute -top-2 -right-1 bg-[white] text-stone-700">
                    <IconButton styles="bg-transparent text-stone-700" on:click={() => editFooterText = true}>
                        <Icon icon="flowbite:edit-solid" class="text-3xl" />
                    </IconButton>
                </CustomTooltip>
            </div>
            <CustomButton 
                on:click={() => {
                    formInputData.footerText = setFooterText(issuerEmail)
                    editFooterText = false;
                }} 
                styles="bg-stone-600 shadow-sm self-end flex gap-2 items-center mt-4 py-2 mx-auto text-center focus:outline focus:outline-2 focus:outline-emerald-700 focus:bg-transparent focus:text-stone-700 hover:shadow-md transition duration-200 ease-in-out">
                Reset
            </CustomButton>
        </div>
    {/if}


    <Separator.Root
        class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    /> 

    <div>
        <div class="mt-10 flex items-center gap-3">
            <Checkbox.Root
            id="includeSignature"
            aria-labelledby="terms-label"
            class="peer inline-flex size-[25px] items-center justify-center rounded-md border border-stone-500 bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
            checked={includeSignature}
            onCheckedChange={() => {
                includeSignature = !includeSignature;
                console.log(openSignaturePad)
                if(!openSignaturePad && includeSignature){
                    openSignaturePad = true;
                }
            }}
            >
            <Checkbox.Indicator
                let:isChecked
                let:isIndeterminate
                class="inline-flex items-center justify-center text-background"
            >
                {#if isChecked}
                    <Icon icon="mingcute:check-2-fill" />
                {:else if isIndeterminate}
                    <Icon icon="fluent-emoji-flat:minus" />
                {/if}
            </Checkbox.Indicator>
            </Checkbox.Root>
            <Label.Root
            id="terms-label"
            for="terms"
            class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
            Include Signature
            </Label.Root>
        </div>
        <SignaturePad {openSignaturePad} on:setSignature={(e) => signature = e.detail} {handleShowOpenSignaturePad} />
        
        {#if formInputData.signature?.length && includeSignature}
            {#each formInputData.signature as layer}
                <Signature {layer} />
            {/each}
            <button on:click={() => {
                formInputData.signature = []
                includeSignature = false;
            }} class="underline text-primary-accent-color3 opacity-90">Remove</button>
        {/if}
    </div>
</form>

<div class="flex justify-between items-center mt-5">
    <button on:click={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
    }} type="reset" class="bg-transparent w-full p-0 text-stone-800 font-medium mb-16 hover:underline focus:underline transition flex items-center ease-in-out duration-200">
        <span>To Top (Save)</span>
        <Icon icon="ep:top" aria-label="arrow up" />
    </button>

    <button on:click={handleCancelCreation} type="reset" class="bg-transparent w-full text-right p-0 text-primary-accent-color3 font-medium mb-16 hover:underline focus:underline transition ease-in-out duration-200">Delete Invoice</button>
</div>