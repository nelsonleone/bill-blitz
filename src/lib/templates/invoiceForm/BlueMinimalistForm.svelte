<script lang="ts">
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import CompanyLogoUpload from "$lib/components/inputs/CompanyLogoUpload.svelte";
    import DatePicker from "$lib/components/inputs/DatePicker.svelte";
    import InvoiceFormInput from "$lib/components/inputs/InvoiceFormInput.svelte";
    import { Checkbox, Label, Separator } from "bits-ui";
    import type { ICurrency, InvoiceItems, ValidationErrors } from "../../../types/types"
    import Icon from "@iconify/svelte";
    import InvoiceFormItem from "$lib/components/invoice/InvoiceFormItem.svelte";
    import CurrenciesSelect from "$lib/components/invoice/CurrenciesSelect.svelte";
    import { validateInputs } from "$lib/helperFns/formValidator";
    import CurrencyIcon from "$lib/components/invoice/CurrencyIcon.svelte";
    import { calculateInvoiceTotal } from "$lib/helperFns/calculateInvoiceTotal";
    import { generateInvoiceNumber } from "$lib/helperFns/generateInvoiceNumber";
    import InvoiceItemsTable from "$lib/components/invoice/InvoiceItemsTable.svelte";
    import SignaturePad from "$lib/components/inputs/SignaturePad.svelte";
    import Signature from "$lib/components/inputs/Signature.svelte";
    import { signatureLayer } from "../../../store";

    let uploadedLogo : string | null;
    let invoiceItemsArr : InvoiceItems[] = []
    let currency : ICurrency;
    let total : number | undefined;
    let issuerEmail : string = "";
    let invoiceDate : any;
    let invoiceNumber : string;
    let includeSignature = false;
    $: openSignaturePad = includeSignature;

    const handleShowOpenSignaturePad = () => {
        if(openSignaturePad && !$signatureLayer.length){
            includeSignature = false;
        }
        openSignaturePad = !openSignaturePad;
    }

    /** @type ValidationErrors */
    $: errors = {}
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
                required: "Enter item price"
                }
            },
            {
                name: "amount",
                value: lastItem.amount,
                rules: {
                required: "Enter item amount"
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
            invoiceItemsArr = [...invoiceItemsArr, { amount: "", description: "", price: "", quantity: 1, saved: false }];
        }
    }


    //Used Any Type Because [name and value] as exist on type Event
    const clearErrorOnInputChange = (e:any) => {
        if(itemsErrors && itemsErrors[e.currentTarget?.name]?.message){
            itemsErrors[e.currentTarget?.name].message = "";
        }
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
</script>

<form class="bg-base-color1 w-full shadow-md py-12 px-4 md:px-12">
    <div class="mb-4">
        <CurrenciesSelect bind:currency={currency} />
    </div>
    <div class="relative flex flex-col justify-end md:items-end">
        <h2 class="hidden md:block -rotate-90 text-7xl tracking-wide text-primary-accent-color2 absolute left-0 top-96 md:top-0 z-0 bottom-0 my-auto opacity-40 font-rubik w-fit h-fit">INVOICE</h2>
        <CompanyLogoUpload {uploadedLogo} />
        <div class="self-end text-right  text-stone-700 mt-4">
            <p class="text-sm text-stone-700 my-3">If Logo Does Not Contain Enterprise Name And You Wish To Add It</p>
            <InvoiceFormInput 
                name="enterpriseName" 
                id="enterprise-name" 
                inputType="text" 
                placeholder="Enter Enterprise name" 
                label="Enterprise Name:" 
                labelStyles="block"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
            <div>
                <h3 class="my-4 font-semibold text-primary-accent-color2 text-lg underline">Contact Info</h3>
                <InvoiceFormInput 
                    name="enterpriseAddress" 
                    id="enterprise-address" 
                    inputType="textArea" 
                    placeholder="Enter Enterprise address" 
                    label="Enterprise Address:" 
                    labelStyles="block"
                    inputStyles="md:w-80 bg-stone-100 font-barlow max-w-64 p-4 border border-gray-500 rounded-md focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                />
                <div class="relative">
                    <p class="mb-2 text-primary-accent-color1 text-sm underline">Optional Fields</p>
                    <div class="absolute right-72 h-1/2 w-1 bg-stone-300 bottom-8 md:right-[21em]"></div>
                    <InvoiceFormInput 
                        name="enterpriseEmail" 
                        id="enterprise-email" 
                        inputType="text" 
                        placeholder="Enter Enterprise email" 
                        label="Enterprise Email:" 
                        labelStyles="block"
                        bind:value={issuerEmail}
                        inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12"
                        containerStyles="m-0"
                    />
                    <InvoiceFormInput 
                        name="billToCustomerPhone" 
                        id="billToCustomer-phone" 
                        inputType="text" 
                        placeholder="Enter Enterprise phone" 
                        label="Enterprise Phone:" 
                        labelStyles="block"
                        inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                    />
                </div>
            </div>
        </div>
    </div>
    <Separator.Root
        class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    />
    <div class="">
        <div>
            <div>
                <InvoiceFormInput 
                    name="invoiceNumber" 
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
            </div>
            <div class="flex items-end justify-end mt-8">
                <DatePicker {invoiceDate} />
            </div>
        </div>

        <Separator.Root
            class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
        /> 

        <div class="mt-16">
            <p class="font-medium mb-3 text-xl">Bill To</p>
            <InvoiceFormInput 
                name="billToCustomerName" 
                id="billTo-CustomerName" 
                inputType="text" 
                placeholder="e.g Example customer" 
                label="Customer Name:" 
                labelStyles="block"
                containerStyles="my-4"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12"
            />
        </div>
    </div>

    <Separator.Root
        class="my-8 lg:my-16 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    /> 

    <div>
        <h2 class="font-medium text-xl mb-4">Items</h2>
        {#if invoiceItemsArr?.length > 0 && invoiceItemsArr[0].saved}
            <InvoiceItemsTable currency={currency.value} {invoiceItemsArr} />
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

       <CustomButton on:click={handleAddItem} styles="bg-stone-600 lg:mt-8 shadow-sm flex gap-2 items-center py-3 focus:outline focus:outline-2 focus:outline-emerald-700 focus:bg-transparent focus:text-stone-700 hover:shadow-md transition duration-200 ease-in-out">
         <span>Add</span>
         <Icon icon="fluent:copy-add-24-filled" class="text-2xl" aria-label="add" />
       </CustomButton>
    </div>


    <div class="my-10">
        <div class="mx-auto flex flex-col bg-emerald-800 text-base-color1 py-4 px-2 rounded-sm">
            <div class="flex my-2">
                <h3 id="sub-total" class="text-xl text-nowrap flex items-center font-semibold font-barlow uppercase ms-2">
                    Sub Total:
                    <strong>
                        <CurrencyIcon styles="text-xl me-1 opacity-70" currency={currency?.value} />
                    </strong>
                </h3>
                <InvoiceFormInput 
                    name="subTotal" 
                    id={`invoiceItems-sub-total`}
                    inputType="number"
                    placeholder="Enter invoice sub-total" 
                    label="Invoice items sub-total"
                    labelStyles="AT_only" 
                    containerStyles="col-span-3 mb-[0]"
                    inputStyles="w-[95%] text-stone-700 text-primary-very-dark-blue w-full rounded-sm p-3 h-10 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                />
            </div>
            <div class="flex my-2">
                <h3 id="total" class="text-xl flex items-center font-semibold font-barlow uppercase ms-2">
                    Total:
                    <strong>
                        <CurrencyIcon styles="text-xl me-1 opacity-70" currency={currency?.value} />
                    </strong>
                </h3>
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
        <CustomButton disabled={!invoiceItemsArr.length} on:click={() => total = calculateInvoiceTotal(invoiceItemsArr)} styles="bg-stone-600 shadow-sm flex gap-2 items-center mt-4 mx-auto py-3 text-center disabled:cursor-not-allowed disabled:opacity-40 focus:outline focus:outline-2 focus:outline-emerald-700 focus:bg-transparent focus:text-stone-700 hover:shadow-md transition duration-200 ease-in-out">Use Total Calculator</CustomButton>
    </div>

    
    <Separator.Root
        class="my-8 lg:my-16 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    /> 

    <div>
        <div class="mt-10 flex items-center gap-3">
            <Checkbox.Root
              id="terms"
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
        <SignaturePad {openSignaturePad} {handleShowOpenSignaturePad} />
        
        {#if $signatureLayer.length && includeSignature}
            {#each $signatureLayer as layer}
                <Signature {layer} />
            {/each}
            <button on:click={() => {
                signatureLayer.set([])
                includeSignature = false;
            }} class="underline text-primary-accent-color3 opacity-90">Remove</button>
        {/if}
    </div>
</form>