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
    import { alertStore } from "../../../store";
    import Signature from "$lib/components/inputs/Signature.svelte";
    import SignaturePad from "$lib/components/inputs/SignaturePad.svelte";
    import { setEmptyValidationErrors, validateInvoiceFormData } from "$lib/helperFns/handleInvoiceFormDataCheck";
    import { goto } from "$app/navigation";
    import { scale } from "svelte/transition";
    import { elasticIn } from "svelte/easing";
    import parsePhoneNumber from 'libphonenumber-js'
    import { AlertSeverity, CurrencyEnum } from "../../../enums";
    import ErrorPara from "$lib/components/prompts/ErrorPara.svelte";

    
    export let templateInUse;



    let invoiceItemsArr : InvoiceItems[] = []
    let issuerEmail : string;
    let issuerName : string;
    let issuerAddress : string;
    let customerEmail: string; 
    let customerName: string; 
    let customerAddress: string; 
    let issuerPhoneNumber : string;
    let customerPhoneNumber : string;
    let currency : ICurrency;




    let includeBankDetails = false;
    let includeTax = false;
    let includesubTotal = false;
    let includeDiscount = false;
    let editFooterText = false;
    let invoiceNumber : string;
    let includeSignature = false;
    $: openSignaturePad = includeSignature;

    let formInputData : Partial<IBasicInvoiceData>

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
            date: undefined,
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
        currency: currency?.value || undefined,
       templateInUse
    }
    $: formInputData.footerText = setFooterText(formInputData.issuer?.contactInfo?.emailAddress || formInputData.issuer?.contactInfo?.phoneNumber || "")


    const handleShowOpenSignaturePad = () => {
        if(openSignaturePad && formInputData.signature.length){
            includeSignature = false;
        }
        openSignaturePad = !openSignaturePad;
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

    const handleSubmit = async() => {
        const { isValid, validationErrors } = validateInvoiceFormData(formInputData)

        if(!isValid && validationErrors){
            console.log(validationErrors)
            errors = validationErrors;

            alertStore.set({
                severity: AlertSeverity.ERROR,
                mssg: "Fix The Errors To Continue"
            })

            return;
        }
    }

</script>

<form in:scale={{ duration: 1000, delay: 2000, easing: elasticIn }} method="post" action="?/setInvoiceData" id="invoice-form" on:submit|preventDefault={handleSubmit} class="bg-base-color1 w-full shadow-md py-12 px-4 md:px-12 mt-16">
    <div class="mb-4">
        <CurrenciesSelect bind:currency={currency} />
    </div>
    <div class="relative flex flex-col justify-end md:items-end">
        <h2 class="hidden md:block -rotate-90 text-7xl tracking-wide text-primary-accent-color2 absolute left-0 top-96 md:top-0 z-0 bottom-0 my-auto opacity-40 font-overpass w-fit h-fit">INVOICE</h2>
        <CompanyLogoUpload uploadedLogo={formInputData.logo} on:setUploadedLogo={(e) => formInputData.logo = e.detail} />
        <ErrorPara error={errors?.issuer?.message} />
        <div class="self-end text-right  text-stone-700 mt-4">
            <p class="text-sm text-stone-700 my-3">If Logo Does Not Contain Enterprise Name And You Wish To Add It</p>
            <InvoiceFormInput 
                name="issuer.name" 
                on:change={() => errors = setEmptyValidationErrors()}
                id="enterprise-name" 
                inputType="text" 
                placeholder="Enter Enterprise name" 
                label="Enterprise Name:" 
                labelStyles="block"
                bind:value={issuerName}
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
            <div>
                <h3 class="my-4 font-semibold text-primary-accent-color2 text-lg underline">Contact Info</h3>
                <InvoiceFormInput 
                    name="issuer.contactInfo.address" 
                    on:change={() => errors = setEmptyValidationErrors()}
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
                        on:change={() => errors = setEmptyValidationErrors()}
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
                        on:change={() => errors = setEmptyValidationErrors()}
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
                    on:change={() => errors = setEmptyValidationErrors()}
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
            <div class="flex items-end justify-end mt-8">
                <DatePicker invoiceDate={formInputData.invoiceData?.date} />
                <ErrorPara error={errors?.date.message} />
            </div>
        </div>

        <Separator.Root
            class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
        /> 

        <div class="mt-16">
            <p class="font-medium mb-3 text-xl">Bill To</p>
            <InvoiceFormInput 
                name="billTo.name" 
                on:change={() => errors = setEmptyValidationErrors()}
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
                on:change={() => errors = setEmptyValidationErrors()}
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
                on:change={() => errors = setEmptyValidationErrors()}
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
                on:change={() => errors = setEmptyValidationErrors()}
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
            <InvoiceItemsTable currency={formInputData.currency} {invoiceItemsArr} />
        {/if}
       {#if invoiceItemsArr?.length}
         {#each invoiceItemsArr as item, i (i)}
            {#if item}
                <InvoiceFormItem handleRemoveItem={handleRemoveItem} errors={itemsErrors} setItemsInputValues={setItemsInputValues}  {...item} index={i} clearErrors={clearErrorOnInputChange} />
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
        
        <div class="flex items-center gap-3">
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
                        on:change={() => errors = setEmptyValidationErrors()}
                        id={`invoiceItems-tax`}
                        inputType="number"
                        bind:value={formInputData.tax}
                        placeholder="Enter tax percentage" 
                        label="Tax Value"
                        labelStyles="AT_only" 
                        containerStyles="col-span-3 mb-[0]"
                        inputStyles="w-[95%] text-stone-700 text-primary-very-dark-blue w-full rounded-sm p-3 h-10 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                    />
                </div>
            {/if}
            
            {#if includeDiscount}
                <div class="flex justify-between my-2">
                    <h3 id="sub-total" class="text-base text-nowrap flex items-center font-semibold font-barlow uppercase ms-2">
                        Discount:
                        <strong>
                            <CurrencyIcon styles="text-xl me-1 opacity-70" currency={formInputData.currency} />
                        </strong>
                    </h3>
                    <InvoiceFormInput 
                        name="discount" 
                        on:change={() => errors = setEmptyValidationErrors()}
                        id={`invoiceItems-discount`}
                        inputType="number"
                        bind:value={formInputData.discount}
                        placeholder="Enter invoice discount" 
                        label="Service or Package Discount"
                        labelStyles="AT_only" 
                        containerStyles="col-span-3 mb-[0]"
                        inputStyles="w-[95%] text-stone-700 text-primary-very-dark-blue w-full rounded-sm p-3 h-10 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                    />
                </div>
            {/if}
            {#if includesubTotal}
                <div class="flex justify-between my-2">
                    <h3 id="sub-total" class="text-base text-nowrap flex items-center font-semibold font-barlow uppercase ms-2">
                        Sub Total:
                        <strong>
                            <CurrencyIcon styles="text-xl me-1 opacity-70" currency={formInputData.currency} />
                        </strong>
                    </h3>
                    <InvoiceFormInput 
                        name="subTotal" 
                        on:change={() => errors = setEmptyValidationErrors()}
                        id={`invoiceItems-sub-total`}
                        inputType="number"
                        bind:value={formInputData.subTotal}
                        placeholder="Enter invoice sub-total" 
                        label="Invoice items sub-total"
                        labelStyles="AT_only" 
                        containerStyles="col-span-3 mb-[0]"
                        inputStyles="w-[95%] text-stone-700 text-primary-very-dark-blue w-full rounded-sm p-3 h-10  focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                    />
                </div>
            {/if}
            <div class="flex justify-between my-2">
                <h3 id="total" class="text-xl flex items-center font-semibold font-barlow uppercase ms-2">
                    Total:
                    <strong>
                        <CurrencyIcon styles="text-xl me-1 opacity-70" currency={formInputData.currency} />
                    </strong>
                </h3>
                <InvoiceFormInput 
                    name="total" 
                    on:change={() => errors = setEmptyValidationErrors()}
                    id={`invoiceItems-total`}
                    inputType="number"
                    placeholder="Enter invoice total" 
                    label="Invoice items total"
                    bind:value={formInputData.total}
                    labelStyles="AT_only" 
                    containerStyles="col-span-3 mb-[0]"
                    inputStyles="w-[95%] text-stone-700 text-primary-very-dark-blue w-full rounded-sm p-3 h-10 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                />
            </div>
        </div>
        <CustomButton disabled={!invoiceItemsArr.length} on:click={() => {
            formInputData.subTotal = calculateInvoiceTotal(invoiceItemsArr,formInputData.discount).subTotal;
            formInputData.total = calculateInvoiceTotal(invoiceItemsArr,formInputData.discount,formInputData.tax).total;
        }} styles="bg-stone-600 shadow-sm flex gap-2 items-center mt-4 mx-auto py-3 text-center disabled:cursor-not-allowed disabled:opacity-40 focus:outline focus:outline-2 focus:outline-emerald-700 focus:bg-transparent focus:text-stone-700 hover:shadow-md transition duration-200 ease-in-out">Use Total Calculator</CustomButton>
        <ErrorPara error={errors?.total?.message} />
    </div>


    <Separator.Root
        class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    /> 

    <div class="text-stone-700 ">
        <div class="mt-10 flex items-center gap-3">
            <Checkbox.Root
              id="includeBankDetails"
              aria-labelledby="terms-label"
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
              id="terms-label"
              for="terms"
              class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include Bank Details
            </Label.Root>
        </div>

        {#if includeBankDetails}
            <InvoiceFormInput 
                name="accountDetails" 
                on:change={() => errors = setEmptyValidationErrors()}
                id="bank-details"
                inputType="textArea"
                placeholder="Example bank\n12345679\nExample name" 
                label="Bank Account Details:"
                labelStyles="block" 
                containerStyles="col-span-3 mb-[0] my-4"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
            <p class="font-rubik text-sm text-primary-accent-color2">Break into new lines after each detail</p>
        {/if}
    </div>

    <Separator.Root
        class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    /> 

    <div>
        <div class="mt-10 relative flex justify-center mx-auto max-w-80">
            <InvoiceFormInput 
                name="footerText" 
                on:change={() => errors = setEmptyValidationErrors()}
                id="footer-text"
                inputType="textArea"
                placeholder="" 
                label="Help Information"
                bind:value={formInputData.footerText}
                labelStyles="AT_only"
                readOnly={!editFooterText} 
                containerStyles="mt-4 mb-[0]"
                inputStyles="w-[100%] bg-stone-100 border border-gray-500 read-only:opacity-40 rounded-md p-4 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
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

    <Separator.Root
        class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    /> 

    <div>
        <div class="mt-10 flex items-center gap-3">
            <Checkbox.Root
              id="includeSignature"
              aria-labelledby="terms-label"
              class="peer inline-flex size-[25px] items-center justify-center rounded-md border border-stone-500 bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
              bind:checked={includeSignature}
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
        <SignaturePad {openSignaturePad} on:setSignature={(e) => formInputData.signature = e.detail} {handleShowOpenSignaturePad} />
        
        {#if formInputData.signature.length && includeSignature}
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

<button on:click={handleCancelCreation} type="reset" class="bg-transparent w-fit text-left p-0 text-primary-accent-color3 font-medium mt-5 mb-16 hover:underline focus:underline transition ease-in-out duration-200">Delete Invoice</button>