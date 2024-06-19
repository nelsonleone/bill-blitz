<script lang="ts">
    import { Select } from "bits-ui";
    import { scale } from "svelte/transition";
    import Icon from "@iconify/svelte";
    import { CurrencyEnum } from "../../../enums";

    export let currency :  {
          value: CurrencyEnum,
          label: string
        } =         
      {
          value: CurrencyEnum.UnitedStates,
          label: "US Dollar"
      }

    const currencies = [
        {
            value: CurrencyEnum.UnitedStates,
            label: "US Dollar",
            icon: "https://flagcdn.com/w20/us.png"
        },
        {
            value: CurrencyEnum.Euro,
            label: "Euro",
            icon: "https://flagcdn.com/w20/eu.png"
        },
        {
            value: CurrencyEnum.Japan,
            label: "Japanese Yen",
            icon: "https://flagcdn.com/w20/jp.png"
        },
        {
            value: CurrencyEnum.UnitedKingdom,
            label: "British Pound",
            icon: "https://flagcdn.com/w20/gb.png"
        },
        {
            value: CurrencyEnum.Nigeria,
            label: "Nigerian Naira",
            icon: "https://flagcdn.com/w20/ng.png"
        }
    ]
</script>
   
<Select.Root items={currencies} preventScroll={false} selected={currency}>
    <Select.Trigger
      class="inline-flex h-14 w-56 justify-between shadow-sm text-stone-800 items-center rounded-lg border-2 border-stone-500 bg-transparent px-[11px] text-sm transition-colors placeholder:text-foreground-alt/50"
      aria-label="Select a currency"
    >
      <Icon class="text-3xl" icon="fluent-mdl2:all-currency" />
      <Select.Value class="text-base" placeholder="Select a currency" />
      <Icon class="text-2xl" icon="teenyicons:caret-vertical-small-outline" />
    </Select.Trigger>
    <Select.Content
      class="w-full rounded-xl border border-muted text-primary-very-dark-blue bg-stone-300 px-1 py-3 shadow-popover outline-none"
      transition={scale}
      sideOffset={8}
    >
      {#each currencies as currency}
        <Select.Item
          class="flex h-10 w-full select-none bg-stone-200 my-2 items-center rounded-md py-3 pl-5 pr-1.5 text-sm outline-none transition-all duration-75 data-[highlighted]:bg-muted hover:cursor-pointer hover:text-base-color1 hover:bg-stone-500"
          value={currency.value}
          label={currency.label}
        >
          <img src={currency.icon} class="me-2" alt={`${currency.value} flag`} />
          {currency.label}
          <Select.ItemIndicator class="ml-auto" asChild={false}>
            <Icon icon="uim:check" />
          </Select.ItemIndicator>
        </Select.Item>
      {/each}
    </Select.Content>
    <Select.Input name="currency" />
</Select.Root>