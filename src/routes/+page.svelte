<script lang="ts">
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import Callout from "$lib/components/layout/Callout.svelte";
    import { featuresDataArray, featuresDataArray2 } from "$lib/componentsData/featuresDataArray";
    import Icon from "@iconify/svelte";

</script>
<main class="page px-0 lg:px-0 w-full pt-0 lg:pt-0">
    <!-- Intro Section -->
    <section class="px-4 md:px-6 bg-intro-secton py-20 h-[85vh] lg:h-screen rounded-bl-[5.5em] md:rounded-bl-[9.5em] text-base-color1 flex justify-center text-center flex-col">
        <h1 class="text-4xl font-barlow font-semibold md:text-5xl">A modern bill generating platform</h1>
        <p class="my-4">
          Create professional invoices and receipts with ease.
        </p>

        <div class="flex justify-center items-center gap-4 mt-8 md:w-80 md:mx-auto">
            <CustomButton styles="bg-white p-2 rounded-3xl text-custom-dark-green transition duration-200 ease-in-out font-medium hover:bg-green-400 hover:text-base-color1" href="/generate">Create Bill</CustomButton>
            <CustomButton styles="border border-base-color1 bg-transparent p-2 rounded-3xl transition duration-200 ease-in-out font-medium hover:border hover:border-green-400" href="/how-it-works">Learn More</CustomButton>
        </div>
    </section>

    <section class="px-4 md:px-6 mt-16 text-primary-very-dark-blue">
        <h2 class="font-barlow font-semibold text-center text-3xl my-4">Invoicing made simple, <span class="inline-block text-teal-700">professionalism assured</span></h2>

        <div class="md:flex flex-col md:mt-20 justify-between gap-8 items-center">
            <div class="relative my-12 max-w-96 mx-auto z-10 md:w-[45%] flex justify-center items-center  before:-z-10 before:bg-cover before:bg-no-repeat before:content-[''] before:block before:absolute before:w-full before:h-full before:bg-[url('/images/bg-pattern-circles.svg')] md:my-0 md:h-auto">
                <img src="/images/invoice-illustration.png" loading="lazy" class="w-[90%]" alt="" aria-hidden="true">
            </div>
    
            <div class="flex flex-col gap-14 mt-16 text-center md:text-left md:justify-center md:flex-row md:flex-wrap lg:justify-center lg:w-full">
                {#each featuresDataArray as data (data.id)}
                   <div class="border-b pb-16 border-b-gray-100 last:border-none md:w-[40%] lg:w-[30%] lg:border-none">
                      {#if data.icon}
                        <div class="bg-green-300 w-14 mx-auto text-center relative rounded-full aspect-square md:m-0">
                          <Icon class="text-4xl absolute top-0 bottom-0 left-0 right-0 m-auto" icon={data.icon} />
                        </div>
                      {/if}
                      <h3 class="text-xl font-semibold my-4 md:text-2xl">{data.title}</h3>
                      <p>{data.text}</p>
                   </div>
                {/each}
            </div>
        </div>
    </section>


    <!-- Testimonials -->
    <section class="border-dotted border-t-2 border-t-gray-500 pt-16 mt-8 px-6 text-primary-very-dark-blue md:pt-24">
        {#each featuresDataArray2 as data (data.id)}
            <div class="mb-20 md:flex justify-between items-center flex-row-reverse odd:flex-row md:mb-28 md:px-24">
                {#if data.img}
                    <div class="w-full mx-auto text-center relative h-52 md:w-[45%] md:h-80 md:m-0">
                       <img src={data.img} alt={data.imgAlt} loading="eager" class="w-full h-full object-cover rounded-sm " />
                    </div>
                {/if}

                <div class="md:w-[45%]">
                    <h3 class="text-2xl font-rubik font-medium my-4">{data.title}</h3>
                    <p>{data.text}</p>
    
                    {#if data.ctaLink}
                        <CustomButton styles="group bg-primary-accent-color2 flex justify-center items-center gap-3 min-w-[13.6em] w-fit md:w-60 transition ease-in-out duration-200 mx-auto md:mx-0 my-6 hover:opacity-95" href={data.ctaLink}>
                            <span>{data.ctaText}</span>
                            <Icon icon="pajamas:long-arrow" class="group-hover:animate-ping-pong-hover text-2xl" />
                        </CustomButton>
                    {/if}
                </div>
            </div>
        {/each}
    </section>

    <Callout />
</main>