<script lang="ts">
  import Icon from "@iconify/svelte";
  import { CurrencyEnum } from "../../../enums";

  export let currency : CurrencyEnum = CurrencyEnum.UnitedStates;
  export let styles : string = "";

  $:{
    console.log(currency)
  }
</script>

<div>
  {#if currency === CurrencyEnum.UnitedStates}
    <Icon class={`text-2xl ${styles}`} icon="el:usd" />
  {:else if currency === CurrencyEnum.Euro}
    <Icon class={`text-2xl ${styles}`} icon="fontisto:euro" />
  {:else if currency === CurrencyEnum.UnitedKingdom}
    <Icon class={`text-2xl ${styles}`} icon="mingcute:currency-pound-2-fill" />
  {:else if currency === CurrencyEnum.Japan}
    <Icon class={`text-2xl ${styles}`} icon="lucide:japanese-yen" />
  {:else if currency === CurrencyEnum.Nigeria}
    <Icon class={`text-2xl ${styles}`} icon="mdi:currency-ngn" />
  {:else}
    <Icon class={`text-2xl ${styles}`} icon="el:usd" />
  {/if}
</div>