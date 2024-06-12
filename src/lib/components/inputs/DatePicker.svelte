<script lang="ts">
    import { DatePicker } from "bits-ui";
    import { fly } from "svelte/transition";
    import Icon from "@iconify/svelte";
    import { getInvoiceDateString } from "$lib/helperFns/getInvoiceDateValue";

    export let invoiceDate : any;
</script>
   
<DatePicker.Root weekdayFormat="short"  onValueChange={(val) => invoiceDate = getInvoiceDateString(val)} fixedWeeks={true}>
    <div class="flex flex-col gap-1.5 justify-end w-56">
      <DatePicker.Label class="block select-none font-overpass"
        >Date</DatePicker.Label
      >
      <DatePicker.Input
        let:segments
        class="flex w-full select-none font-overpass px-2 items-center bg-stone-100 border border-gray-500 text-right rounded-md p-3 h-12 tracking-[0.01em] text-stone-700 focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-2 hover:border-emerald-700"
      >
        {#each segments as { part, value }}
          <div class="inline-block select-none uppercase">
            {#if part === "literal"}
              <DatePicker.Segment {part} class="p-1 text-muted-foreground">
                {value}
              </DatePicker.Segment>
            {:else}
              <DatePicker.Segment
                {part}
                class="rounded-5px px-1 text-stone-600 rounded-sm aria-[valuetext=Empty]:text-muted-foreground focus:bg-stone-300 focus:outline focus:outline-stone-500"
              >
                {value}
              </DatePicker.Segment>
            {/if}
          </div>
        {/each}
        <DatePicker.Trigger
          class="self-center text-3xl flex justify-end w-full focus:outline-none"
        >
            <Icon icon="uim:calender" />
        </DatePicker.Trigger>
      </DatePicker.Input>
      <DatePicker.Content
        sideOffset={6}
        transition={fly}
        transitionConfig={{ duration: 150, y: -8 }}
        class="z-50"
      >
        <DatePicker.Calendar
          class="rounded-[15px] border border-dark-10 bg-stone-800 text-base-color1 p-[22px] shadow-popover"
          let:months
          let:weekdays
        >
          <DatePicker.Header class="flex items-center justify-between">
            <DatePicker.PrevButton
              class="inline-flex size-10 items-center justify-center rounded-9px bg-stone-500 text-base-color1 transition-all hover:bg-muted active:scale-98"
            >
             <Icon icon="mage:caret-left-fill" />
            </DatePicker.PrevButton>
            <DatePicker.Heading class="text-[15px] font-medium" />
            <DatePicker.NextButton
              class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:bg-muted active:scale-98"
            >
             <Icon icon="mage:caret-right-fill" />
            </DatePicker.NextButton>
          </DatePicker.Header>
          <div
            class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            {#each months as month}
              <DatePicker.Grid
                class="w-full border-collapse select-none space-y-1"
              >
                <DatePicker.GridHead>
                  <DatePicker.GridRow class="mb-1 flex w-full justify-between">
                    {#each weekdays as day}
                      <DatePicker.HeadCell
                        class="w-10 rounded-md text-xs !font-normal text-muted-foreground"
                      >
                        <div>{day.slice(0, 2)}</div>
                      </DatePicker.HeadCell>
                    {/each}
                  </DatePicker.GridRow>
                </DatePicker.GridHead>
                <DatePicker.GridBody>
                  {#each month.weeks as weekDates}
                    <DatePicker.GridRow class="flex w-full">
                      {#each weekDates as date}
                        <DatePicker.Cell
                          {date}
                          class="relative size-10 !p-0 text-center text-sm"
                        >
                          <DatePicker.Day
                            {date}
                            month={month.value}
                            class="group relative inline-flex size-10 items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-transparent p-0 text-sm font-normal text-foreground transition-all hover:border-foreground data-[disabled]:pointer-events-none data-[disabled]:text-stone-400 data-[disabled]:opacity-90 data-[outside-month]:pointer-events-none data-[selected]:bg-stone-500 data-[selected]:font-medium data-[disabled]:text-foreground/30  data-[unavailable]:text-muted-foreground data-[unavailable]:line-through"
                          >
                            <div
                              class="absolute top-[5px] hidden size-1 rounded-full bg-foreground transition-all group-data-[today]:block group-data-[selected]:bg-background"
                            />
                            {date.day}
                          </DatePicker.Day>
                        </DatePicker.Cell>
                      {/each}
                    </DatePicker.GridRow>
                  {/each}
                </DatePicker.GridBody>
              </DatePicker.Grid>
            {/each}
          </div>
        </DatePicker.Calendar>
      </DatePicker.Content>
    </div>
</DatePicker.Root>