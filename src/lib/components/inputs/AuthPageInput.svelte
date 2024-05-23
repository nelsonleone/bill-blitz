<script lang="ts">
  import IconButton from '$lib/components/buttons/IconButton.svelte';
  import Icon from '@iconify/svelte';
  import type { AuthPageInputData } from '../../../types/types';
  
  export let inputProps:AuthPageInputData;
  const  { placeholder, id, inputType, label, labelStyles, name, inputStyles, containerStyles } = inputProps;

    /**
   * @param {string | undefined} error
   */
  export let error;

  let localInputType = inputType;
  $: showPassword = localInputType === "text";
</script>

<div class={`my-4 w-full ${containerStyles}`}>
  <label for={id} class={`text-sm mb-3 ${labelStyles} ${!label ? "AT_only" : ""}`}>{label}</label>

  <div class="relative h-14 w-full">
    <input
      {name}
      {placeholder}
      {id}
      type={localInputType}
      class={`absolute top-0 bottom-0 border border-gray-400 rounded-md focus:outline-none focus:outline-offset-0 focus:border-2 focus:border-base-color2 ps-9 pe-7 h-full bg-slate-50 left-0 w-full placeholder:text-base-color2 placeholder:opacity-80 ${inputStyles}`}
    />
    <Icon class="absolute left-3 text-xl top-0 bottom-0 my-auto text-accent-color2" icon={inputType === "email" ? "mdi:email-lock" : inputType === "password" ? "teenyicons:password-solid" : "fa6-solid:user" }/>
    
    {#if inputType === "password"}
      <IconButton on:click={() => localInputType = localInputType === "password" ? "text" : "password" } styles="w-auto bg-transparent p-0 inline-block text-primary-dark-blue absolute top-0 mx-0 bottom-0 my-auto text-2xl z-10 right-0" ariaLabel={showPassword ? "hide password" : "hide password"} {id}>
        <Icon icon="bx:show-alt" />
      </IconButton>
    {/if}
  </div>

  {#if error}
    <p role="alert" class="font-roboto-condensed text-sm text-primary-accent-color3 mt-2 block">{error}</p>
  {/if}
</div>
  