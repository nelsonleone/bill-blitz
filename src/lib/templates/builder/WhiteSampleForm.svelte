<script lang="ts">
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import CompanyLogoUpload from "$lib/components/inputs/CompanyLogoUpload.svelte";
    import DatePicker from "$lib/components/inputs/DatePicker.svelte";
    import InvoiceFormInput from "$lib/components/inputs/InvoiceFormInput.svelte";
    import { Separator } from "bits-ui";
    import type { ICurrency, InvoiceItems, ValidationErrors } from "../../../types/types"
    import Icon from "@iconify/svelte";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import InvoiceFormItem from "$lib/components/invoice/InvoiceFormItem.svelte";
    import CurrenciesSelect from "$lib/components/invoice/CurrenciesSelect.svelte";
    import { validateInputs } from "$lib/helperFns/formValidator";
    import CurrencyIcon from "$lib/components/invoice/CurrencyIcon.svelte";

    let uploadedLogo : string | null;
    let invoiceItemsArr : InvoiceItems[] = []
    let currency : ICurrency;

    /** @type ValidationErrors */
    $: errors = {}
    /** @type any */
    let itemsErrors : ValidationErrors

    const handleAddItem = () => {
        // Check if there are any items in the array
        if (invoiceItemsArr.length > 0) {
            const lastItem = invoiceItemsArr[invoiceItemsArr.length - 1];

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

        // Add a new item slot to the array
        invoiceItemsArr = [...invoiceItemsArr, { amount: "", description: "", price: "", quantity: 1 }];
    }


    //Used Any Type Because [name and value] as exist on type Event
    const clearErrorOnInputChange = (e:any) => {
        if(itemsErrors && itemsErrors[e.currentTarget?.name]?.message){
            console.log(itemsErrors[e.currentTarget?.name].message)
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
</script>

<form class="bg-base-color1 w-full shadow-md py-12 px-4">
    <div class="mb-4">
        <CurrenciesSelect currency={currency} />
    </div>
    <div class="flex flex-col justify-end">
        <CompanyLogoUpload {uploadedLogo} />
        <div class="self-end text-right  text-stone-700 mt-4">
            <p class="text-sm text-stone-700 my-3">If Logo Does Not Contain Enterprise Name And You Wish To Add It</p>
            <InvoiceFormInput 
                name="enterpriseName" 
                id="enterprise-name" 
                inputType="text" 
                placeholder="Enter Enterprise name" 
                label="Enterprise Name:" 
                labelStyles=""
                inputStyles="bg-stone-100 border border-gray-500 text-right rounded-md p-3 h-12"
            />
            <div>
                <h3>Contact Info</h3>
                <InvoiceFormInput 
                    name="enterpriseAddress" 
                    id="enterprise-address" 
                    inputType="textArea" 
                    placeholder="Enter Enterprise address" 
                    label="Enterprise Address:" 
                    labelStyles=""
                    inputStyles="bg-stone-100 font-barlow max-w-64 p-4 text-right border border-gray-500 rounded-md"
                />
                <div class="relative">
                    <p class="mb-2 text-primary-accent-color1 underline">Optional Fields</p>
                    <div class="absolute left-4 h-1/2 w-1 bg-stone-300 bottom-8"></div>
                    <InvoiceFormInput 
                        name="enterpriseEmail" 
                        id="enterprise-email" 
                        inputType="text" 
                        placeholder="Enter Enterprise email" 
                        label="Enterprise Email:" 
                        labelStyles=""
                        inputStyles="bg-stone-100 border border-gray-500 text-right rounded-md p-3 h-12"
                        containerStyles="m-0"
                    />
                    <InvoiceFormInput 
                        name="billToEnterprisePhone" 
                        id="billToEnterprise-phone" 
                        inputType="text" 
                        placeholder="Enter Enterprise phone" 
                        label="Enterprise Phone:" 
                        labelStyles=""
                        inputStyles="bg-stone-100 border border-gray-500 text-right rounded-md p-3 h-12"
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
                    labelStyles=""
                    containerStyles="mb-[.7em]"
                    inputStyles="bg-stone-100 border border-gray-500 rounded-md p-3 h-12"
                />
                <CustomButton styles="bg-stone-700 py-3">Generate</CustomButton>
            </div>
            <div class="flex items-end justify-end mt-8">
                <DatePicker />
            </div>
        </div>

        <div class="mt-14">
            <p class="font-medium underline mb-3 text-lg">Bill To</p>
            <InvoiceFormInput 
                name="billToEnterpriseName" 
                id="billTo-EnterpriseName" 
                inputType="text" 
                placeholder="e.g Example enterprise" 
                label="Enterprise Name:" 
                labelStyles=""
                containerStyles="my-4"
                inputStyles="bg-stone-100 border border-gray-500 rounded-md p-3 h-12"
            />
            <InvoiceFormInput 
                name="billToEnterpriseAddress" 
                id="billTo-EnterpriseAddress" 
                inputType="textArea" 
                placeholder="e.g no.5 enterprise address street" 
                label="Enterprise Address:" 
                labelStyles="my-4"
                containerStyles=""
                inputStyles="bg-stone-100 border border-gray-500 rounded-md p-3"
            />
        </div>
    
        <div class="relative">
            <p class="mb-2 text-primary-accent-color1 underline">Optional Fields</p>
            <div class="absolute right-4 h-1/2 w-1 bg-stone-300 bottom-8"></div>
            <InvoiceFormInput 
                name="billToEnterpriseEmail" 
                id="billToEnterprise-email" 
                inputType="text" 
                placeholder="Enter Enterprise email" 
                label="Enterprise Email:" 
                labelStyles=""
                inputStyles="bg-stone-100 border border-gray-500 rounded-md p-3 h-12"
                containerStyles="m-0"
            />
            <InvoiceFormInput 
                name="enterprisePhone" 
                id="enterprise-phone" 
                inputType="text" 
                placeholder="Enter Enterprise phone" 
                label="Enterprise Phone:" 
                labelStyles=""
                inputStyles="bg-stone-100 border border-gray-500 rounded-md p-3 h-12"
            />
        </div>
    </div>

    <Separator.Root
        class="my-8 shrink-0 bg-stone-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    /> 

    <div>
        <h2 class="text-xl underline font-medium mb-4">Items</h2>
       {#if invoiceItemsArr?.length}
         {#each invoiceItemsArr as item, i (i)}
            {#if item}
                <InvoiceFormItem {currency} errors={itemsErrors} setItemsInputValues={setItemsInputValues}  {...item} index={i} clearErrors={clearErrorOnInputChange} />
            {/if}
         {/each}
       {:else}
         <p class="text-sm text-primary-accent-color2">You Haven't Added Any Item Yet</p>
       {/if}

       <CustomButton on:click={handleAddItem} styles="bg-stone-600 shadow-sm flex gap-2 items-center py-3">
         <span>Add</span>
         <Icon icon="fluent:copy-add-24-filled" class="text-2xl" aria-label="add" />
       </CustomButton>
    </div>


    <div class="flex items-center bg-stone-400">
        <h3 id="total" class="">Total:</h3>
        <strong aria-describedby="total">
        </strong>
        <InvoiceFormInput 
            name="total" 
            id={`invoiceItems-total`}
            inputType="text"
            placeholder="e.g Bag Of Rice" 
            label="Invoice items total" 
            containerStyles="col-span-3"
            inputStyles="text-stone-700 bg-stone-100 border border-gray-500 w-full rounded-md p-3 h-12"
        />
    </div>
</form>