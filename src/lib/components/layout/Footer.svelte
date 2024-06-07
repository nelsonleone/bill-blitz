<script>
    import CustomButton from "../buttons/CustomButton.svelte";
    import Logo from "../logo/index.svelte";

</script>


<footer class=" border-t mt-20 border-t-gray-300 pt-16 pb-8 bg-custom-dark-green backdrop-opacity-30 text-base-color1 px-6 lg:px-24">
    <div>
        <a href="/">
            <Logo logoFor="footer" styles="w-24" /></a>
        <p class="underline">Generate Awesome quick invoice</p>
        
        <div class="flex items-center gap-4 mt-4">
            <a class="p-3 rounded-full bg-base-color1" target=”_blank” href="https://twitter.com/NelsonF2e">
                <img src="/icons/creator-icon.png" class="hover:scale-105 ease-linear duration-200 w-10 h-10" alt="creator" />
            </a>

            <a class="p-3 rounded-full bg-base-color1" target=”_blank” href="https://github.com/nelsonleone/bill-blitz">
                <img src="/icons/github.svg" class="hover:scale-105 ease-linear duration-200 w-8" alt="github" />
            </a>            
        </div>
    </div>

    <nav class="mt-12 flex flex-col gap-8 md:flex-row md:justify-between">
        <ul>
            <li class="font-medium text-gray-400 text-xl mb-3">Products</li>
            <li class="footer-li"><a href="/generate/invoice">Create Invoice</a></li>
            <li class="footer-li"><a href="/generate/receipt">Receipt Maker</a></li>
        </ul>

        <ul>
            <li class="font-medium text-gray-400 text-xl mb-3">Resources</li>
            <li class="footer-li"><a href="/templates?tab=invoice">Invoice Templates</a></li>
            <li class="footer-li"><a href="/templates?tab=receipts">Receipt Templates</a></li>
        </ul>

        <ul>
            <li class="font-medium text-gray-400 text-xl mb-3">Company</li>
            <li class="footer-li"><a href="/about">About</a></li>
            <li class="footer-li"><a href="/contact">Contact</a></li>
        </ul>

        <ul>
            <li class="font-medium text-gray-400 text-xl mb-3">Get Started</li>
            <CustomButton styles="text-base-color1 bg-primary-accent-color2 w-[fit-content] py-3 transition ease-in-out duration-200 hover:bg-transparent hover:text-primary-accent-color2 hover:outline hover:outline-2  focus:outline-offset-0 hover:outline-offset-0 hover:outline-primary-accent-color2 focus:bg-transparent focus:outline focus:outline-2 focus:outline-primary-accent-color2" href="/generate">Generate Bill</CustomButton>
        </ul>
    </nav>

    <div class="mt-16 flex justify-center items-center border-t border-t-gray-200">
        <img src="/icons/cc-stripe.svg" class="size-16" alt="stripe" />
    </div>
</footer>