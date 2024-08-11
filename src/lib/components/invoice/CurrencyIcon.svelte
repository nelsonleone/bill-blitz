<script lang="ts">
  import { CurrencyEnum } from "../../../enums";

  export let currency : CurrencyEnum = CurrencyEnum.UnitedStates;
  export let styles : string = "";
</script>

<div class={`text-2xl m-0 p-0 inline ${styles}`}>
  {#if currency === CurrencyEnum.UnitedStates}
    $
  {:else if currency === CurrencyEnum.Euro}
    €
  {:else if currency === CurrencyEnum.UnitedKingdom}
    £
  {:else if currency === CurrencyEnum.Japan}
    ¥
  {:else if currency === CurrencyEnum.Nigeria}
    ₦
  {:else}
    $
  {/if}
</div>
