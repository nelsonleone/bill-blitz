<script lang="ts">
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import CompanyLogoUpload from "$lib/components/inputs/CompanyLogoUpload.svelte";
    import DatePicker from "$lib/components/inputs/DatePicker.svelte";
    import InvoiceFormInput from "$lib/components/inputs/InvoiceFormInput.svelte";
    import { Checkbox, Label, Separator } from "bits-ui";
    import type { ICurrency, InvoiceItems, ValidationErrors } from "../../../types/types"
    import Icon from "@iconify/svelte";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
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

    let uploadedLogo : string | null;
    let invoiceItemsArr : InvoiceItems[] = []
    let currency : ICurrency;
    let total : number | undefined;
    let includeBankDetails = false;
    let editFooterText = false;
    let issuerEmail : string = "";
    let footerText = setFooterText(issuerEmail)
    let invoiceDate : any;
    let invoiceNumber : string;

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
        invoiceItemsArr = invoiceItemsArr.filter((item,i) => i !== index)
    }
</script>

<form class="bg-base-color1 w-full shadow-md py-12 px-5 md:px-12">
    <div class="mb-4 gap-2">
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
                        name="billToEnterprisePhone" 
                        id="billToEnterprise-phone" 
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
                name="billToEnterpriseName" 
                id="billTo-EnterpriseName" 
                inputType="text" 
                placeholder="e.g Example enterprise" 
                label="Enterprise Name:" 
                labelStyles="block"
                containerStyles="my-4"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12"
            />
            <h3 class="my-4 font-semibold text-primary-accent-color2 text-lg underline">Contact Info</h3>
            <InvoiceFormInput 
                name="billToEnterpriseAddress" 
                id="billTo-EnterpriseAddress" 
                inputType="textArea" 
                placeholder="e.g no.5 enterprise address street" 
                label="Enterprise Address:" 
                labelStyles="block my-4"
                containerStyles=""
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
        </div>
    
        <div class="relative">
            <p class="mb-2 text-primary-accent-color1 text-sm underline">Optional Fields</p>
            <div class="absolute left-72 h-1/2 w-1 bg-stone-300 bottom-8 md:left-[21em]"></div>
            <InvoiceFormInput 
                name="billToEnterpriseEmail" 
                id="billToEnterprise-email" 
                inputType="text" 
                placeholder="Enter Enterprise email" 
                label="Enterprise Email:" 
                labelStyles="block"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
                containerStyles="m-0"
            />
            <InvoiceFormInput 
                name="enterprisePhone" 
                id="enterprise-phone" 
                inputType="text" 
                placeholder="Enter Enterprise phone" 
                label="Enterprise Phone:" 
                labelStyles="block"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
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


    <div>
        <div class="flex items-center justify-center bg-emerald-800 text-base-color1 rounded-md py-4 px-2 mt-16 w-11/12 md:w-2/5 mx-auto">
            <h3 id="total" class="text-xl font-semibold font-barlow uppercase ms-2">Total:</h3>
            <strong aria-describedby="total">
                <CurrencyIcon styles="text-2xl me-1" currency={currency?.value} />
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
                inputStyles="text-stone-700 text-primary-very-dark-blue w-full rounded-sm p-3 h-10 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />

        </div>
        <CustomButton disabled={!invoiceItemsArr.length} on:click={() => total = calculateInvoiceTotal(invoiceItemsArr)} styles="bg-stone-600 shadow-sm flex gap-2 items-center mt-4 mx-auto py-3 text-center disabled:cursor-not-allowed disabled:opacity-40 focus:outline focus:outline-2 focus:outline-emerald-700 focus:bg-transparent focus:text-stone-700 hover:shadow-md transition duration-200 ease-in-out">Use Total Calculator</CustomButton>
    </div>


    <Separator.Root
        class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    /> 

    <div class="text-stone-700 ">
        <div class="mt-10 flex items-center gap-3">
            <Checkbox.Root
              id="terms"
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
                name="bankDetails" 
                id="bank-details"
                inputType="textArea"
                placeholder="Example bank&#10; 12345679&#10; Example name" 
                label="Bank Account Details:"
                labelStyles="block" 
                containerStyles="col-span-3 mb-[0] my-4"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 rounded-md p-3 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
            <p class="font-rubik text-sm text-primary-accent-color1">Break into new lines after each detail</p>
        {/if}
    </div>

    <div>
        <div class="mt-10 relative flex justify-center">
            <InvoiceFormInput 
                name="footerText" 
                id="footer-text"
                inputType="textArea"
                placeholder="" 
                label="Help Information"
                bind:value={footerText}
                labelStyles="AT_only"
                readOnly={!editFooterText} 
                containerStyles="mt-4 mb-[0]"
                inputStyles="md:w-80 bg-stone-100 border border-gray-500 read-only:opacity-40 rounded-md p-4 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
            
            <CustomTooltip tooltipMssg="Edit" styles="absolute -top-2 right-0 bg-[white] text-stone-700">
                <IconButton styles="bg-transparent text-stone-700" on:click={() => editFooterText = true}>
                    <Icon icon="flowbite:edit-solid" class="text-3xl" />
                </IconButton>
            </CustomTooltip>
            </div>
            <CustomButton 
                on:click={() => {
                    footerText = setFooterText(issuerEmail)
                    editFooterText = false;
                }} 
                styles="bg-stone-600 shadow-sm self-end flex gap-2 items-center mt-4 py-2 mx-auto text-center focus:outline focus:outline-2 focus:outline-emerald-700 focus:bg-transparent focus:text-stone-700 hover:shadow-md transition duration-200 ease-in-out">
                Reset
            </CustomButton>
    </div>
</form>