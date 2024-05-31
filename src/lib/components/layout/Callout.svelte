<script>
    import Icon from "@iconify/svelte";
    import CustomButton from "../buttons/CustomButton.svelte";

</script>

<!-- Callout -->
<div class="relative overflow-hidden bg-callout w-full h-[26em] md:h-[30em] rounded-tl-[40px] rounded-br-[40px] md:rounded-tl-[120px] md:rounded-br-[120px] z-10 flex justify-center items-center flex-col px-4 lg:px-6 before:absolute before:-z-10 before:bottom-[-40%] before:left-[-80px] before:h-[300px] before:w-[300px] before:rounded-full before:bg-callout-circle-before before:opacity-50 after:bg-callout-circle-after after:absolute after:-z-10 after:top-6 after:right-3 after:w-32 after:opacity-50  after:rounded-full after:aspect-square">
    <h1 class="text-4xl my-4 text-base-color1 text-center font-bold md:text-5xl md:w-1/2 md:mx-auto">Many People rely on Bill Blitz to deliver quick bills</h1>
    <CustomButton styles="group flex justify-center  font-semibold mt-4 capitalize px-3 py-4 items-center gap-3 text-custom-dark-green bg-base-color1 w-fit" href="/about">
        <span>About Bill Blitz</span>
        <Icon icon="pajamas:long-arrow" class="group-hover:animate-ping-pong-hover text-2xl" />
    </CustomButton>
</div>