<script lang="ts">
    import { Label, Input } from 'flowbite-svelte';
    import type { AuthPageInputData } from '../../types/types';
    import Icon from '@iconify/svelte';
    
    export let inputProps:AuthPageInputData;
    const  { placeholder, id, inputType, label, labelStyles, name, inputStyles, containerStyles } = inputProps;
</script>

<div class={`${containerStyles}`}>
    {#if label}
      <Label for={id} class={`${labelStyles}`}>{label}</Label>
    {/if}
    <Input {id} type={inputType} {name} {placeholder} defaultClass={`${inputStyles}`}>
        {#if inputType === "email"}
            <Icon icon="fa6-solid:user" />
            {:else}
            <Icon icon="hugeicons:circle-password" />
        {/if}
    </Input>
</div>
  