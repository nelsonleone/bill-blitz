<script lang="ts">
    import { Tooltip } from "bits-ui";
    import { scale } from "svelte/transition";

    export let tooltipMssg : string;
    export let styles : string;
</script>

<Tooltip.Root openDelay={0} closeDelay={200}>
    <Tooltip.Trigger
      class={`inline-flex size-10 items-center aspect-square justify-center rounded-full bg-green-100 shadow-sm ring-dark ring-offset-background hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-background ${styles}`}
    >
      <slot />
    </Tooltip.Trigger>
    <Tooltip.Content
      transition={scale}
      transitionConfig={{ duration: 150 }}
      sideOffset={8}
    >
      <div class="bg-background">
        <Tooltip.Arrow class="rounded-[2px] border-l border-t border-dark-10" />
      </div>
      <div
        class="flex items-center justify-center rounded-input border border-dark-10 bg-base-color1 shadow-sm p-3 text-sm font-medium shadow-popover outline-none"
      >
        {tooltipMssg}
      </div>
    </Tooltip.Content>
</Tooltip.Root>