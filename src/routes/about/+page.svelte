<script>
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import Icon from "@iconify/svelte";
    import { Video } from "flowbite-svelte";

</script>
<main class="page px-0 md:px-0 lg:px-0 mt-0 md:mt-16">
    <section class="flex flex-col-reverse md:flex-row md:w-[95%] md:justify-center md:mx-auto rounded-2xl">
        <div class="bg-callout text-base-color1 px-4 py-8 text-center md:rounded-tl-2xl rounded-bl-2xl md:text-left md:px-20 md:w-1/2">
            <h1 class="text-3xl my-6 uppercase">About Us</h1>
            <p class="leading-7">BillBlitz is an all-in-one invoicing solution designed to simplify your billing process. With our user-friendly platform and customizable templates, you can create professional invoices, and receipts in minutes.
                Whether you're a freelancer or run a small business, BillBlitz helps you get paid faster and maintain a polished brand image. Our platform seamlessly integrates with your workflow, saving you time and allowing you to focus on growth.
                Experience the power of BillBlitz and take control of your billing today.
            </p>
        </div>
        <div class="md:w-1/2">
            <img src="/images/pexels-fauxels-3184418.jpg" alt="hands together" class="h-80 w-full object-cover md:h-full rounded-tr-2xl rounded-br-2xl" />
        </div>
    </section>

    <section class="my-20 px-4 md:px-8 text-primary-very-dark-blue lg:w-2/3 md:mx-auto">
        <h2 class="text-center my-12 font-rubik text-2xl md:text-3xl">Some Bill Blitz Features <br /> Customers Admire</h2>
        <div class="relative pb-5 after:content-[''] my-16 after:absolute after:block after:w-16 after:h-1 after:bottom-0 after:left-1 after:bg-primary-accent-color1 md:flex md:justify-between lg:pb-0 lg:after:bottom-14 md:mt-24">
            <div class="md:w-2/5">
                <h3 class="font-semibold mb-4 text-lg text-primary-very-dark-blue underline capitalize">&#42; Efficient Billing for Your Business</h3>
                <p>BillBlitz simplifies invoicing for individuals and small businesses. Being able to create invoices, and receipts in minutes, have given a good lasting impression on our users.
                    Our user-friendly platform and templates ensure a smooth, efficient workflow, so you can focus on running your business. Experience the convenience of effortless invoicing with BillBlitz. 
                </p>
            </div>
            <div class="md:w-2/5">
                <img src="/images/for-about1.jpg" alt="a person" class="rounded-md mt-3 w-full h-80 md:h-full md:mt-0" />
            </div>
        </div>

        <div class="relative pb-5 after:content-[''] my-16 after:absolute after:block after:w-16 after:h-1 after:bottom-0 after:left-1 after:bg-primary-accent-color1 md:flex md:flex-row-reverse md:justify-between lg:pb-0 lg:after:bottom-14 md:after:left-auto md:after:right-0 md:mt-24">
            <div class="md:w-2/5">
                <h3 class="font-semibold mb-4 text-lg text-primary-very-dark-blue underline capitalize">&#42; Invoicing Effortlessly with BillBlitz</h3>
                <p>
                    Say goodbye to the hassle of manual invoicing. BillBlitz empowers you to create professional invoices, estimates, and receipts in a matter of minutes, eliminating the stress of paper-based billing. Our intuitive platform and customizable templates make it easy to generate polished financial documents that impress your clients. Experience the convenience of effortless invoicing and get back to growing your business. 
                </p>
            </div>
            <div class="md:w-2/5">
                <img src="/images/for-about2.jpg" alt="a person" class="rounded-md mt-3 w-full h-80 md:h-full md:mt-0" />
            </div>
        </div>
    </section>
    
    <div class="relative overflow-hidden bg-callout w-full h-[26em] md:h-[30em] rounded-tl-[40px] rounded-br-[40px] md:rounded-tl-[120px] md:rounded-br-[120px] z-10 flex justify-center items-center flex-col px-4 lg:px-6 before:absolute before:-z-10 before:bottom-[-40%] before:left-[-80px] before:h-[300px] before:w-[300px] before:rounded-full before:bg-callout-circle-before before:opacity-50 after:bg-callout-circle-after after:absolute after:-z-10 after:top-6 after:right-3 after:w-32 after:opacity-50  after:rounded-full after:aspect-square">
        <h1 class="text-4xl my-4 text-base-color1 text-center font-bold md:text-5xl md:w-1/2 md:mx-auto">Many People rely on Bill Blitz to deliver quick bills</h1>
        <CustomButton styles="group flex justify-center  font-semibold mt-4 capitalize px-3 py-4 items-center gap-3 text-custom-dark-green bg-base-color1 w-fit" href="/account/upgrade">
            <span>Unlock your app</span>
            <Icon icon="pajamas:long-arrow" class="group-hover:animate-ping-pong-hover text-2xl" />
        </CustomButton>
    </div>
</main>