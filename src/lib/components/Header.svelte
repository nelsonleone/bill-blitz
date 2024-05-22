<script lang="ts">
    
    import { DropdownMenu } from "bits-ui";
    import { page } from "$app/stores";
    import Logo from "$lib/logo/index.svelte";
    import Icon from "@iconify/svelte";
    import IconButton from "$lib/buttons/IconButton.svelte";
    import CustomButton from "$lib/buttons/CustomButton.svelte";
    import { browser } from '$app/environment';
    import { clickOutside } from "$lib/helperFns/clickOutside";
    import { onMount } from "svelte";


    $: activeUrl = $page.url.pathname;

    const beenAuthenticated = false;
    let windowInnerWidth;
    $: showNav = window.innerWidth <= 768 ? false : true;

    if(browser){
        showNav = window.innerWidth <= 768 ? false : true;
    }

    const toggleShowNav = (e:MouseEvent) => {
        e.stopPropagation()
        showNav = !showNav;
    }

    onMount(() => {
        const resize = () => {
            windowInnerWidth = window.innerWidth;
        } 
        
        window.addEventListener('resize',resize)

        return () => {
            window.removeEventListener('resize',resize)
        }
    })

</script>


<header class="relative">
    <nav class="px-4 lg:px-8 fixed h-20 top-0 z-40 bg-base-color1 w-full drop-shadow-lg left-0 flex items-center justify-between">
        <a href="/">
            <Logo styles="w-20 lg:w-[5.5em]" />
        </a>

        <ul 
          use:clickOutside={() => {
            showNav = false;
          }}
          class={`absolute flex justify-between shadow-lg shadow-gray-500 drop-shadow-2xl  bg-custom-dark-green bg-gradient-radial from-[#065234] to-[#0c6256] text-base-color1 px-4 pt-10 h-44 w-full left-0 -bottom-44 lg:bg-transparent lg:p-0 lg:h-auto lg: lg:w-5/12 lg:justify-end lg:gap-12 lg:bottom-0 lg:shadow-none lg:static lg:text-primary-dark-blue lg:drop-shadow-none ${showNav ? "flex" : "hidden"}`}>
            <li class="hidden lg:block">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger class={`font-medium hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl.match("/generate") ? "text-primary-accent-color2" : ""}`}>
                        Generate
                    </DropdownMenu.Trigger>
                   
                    <DropdownMenu.Content class="relative left-0 top-0 w-36 gap-3 px-1 py-4 flex text-primary-dark-blue flex-col items-center z-50 rounded-md bg-base-color1 shadow-2xl">
                      <DropdownMenu.Item class="bg-gray-100 p-2 hover:bg-green-300">
                            <a href="/generate/invoice" class="font-medium flex gap-4 items-center">
                                <Icon class="text-2xl" icon="mdi:invoice-schedule-outline" />
                                <span>Invoice</span>
                            </a>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item class="bg-gray-100 hover:bg-green-300 p-2">
                            <a href="/generate/receipt" class="font-medium  flex gap-4 items-center">
                                <Icon class="text-xl" icon="streamline:receipt" />
                                <span>Receipt</span>
                            </a>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </li>

            <li class="lg:hidden">
                <span class="text-gray-400">Generate</span>
                <ul class="ps-3 mt-2">
                    <li class={`mb-4 font-medium hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/generate/invoice" ? "text-primary-accent-color2" : ""}`}>
                        <a href="/generate/invoice" class="font-medium">Invoice</a>
                    </li>
                    <li class={`font-medium hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/generate/receipt" ? "text-primary-accent-color2" : ""}`}>
                        <a href="/generate/receipt" class="font-medium">Receipt</a>
                    </li>
                </ul>
            </li>

            <li class={`font-medium hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/about" ? "text-primary-accent-color2" : ""}`}><a href="/about">About Us</a></li>
            <li class={`font-medium hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/how-it-works" ? "text-primary-accent-color2" : ""}`}><a href="/how-it-works">How It Works</a></li>
        </ul>

        <div class="flex items-center gap-3">
            <ul>
                {#if beenAuthenticated}
                  <li><a href="/account/upgrade">Upgrade</a></li>
                {/if}
                {#if !beenAuthenticated} 
                 <li>
                    <CustomButton styles="block w-full bg-custom-dark-green py-[.55em]  rounded-sm hover:opacity-90 focus:border focus:border-custom-dark-green focus:text-primary-dark-blue focus:bg-transparent transition duration-200 ease-linear" href="/auth/sign_in">
                        Sign In
                    </CustomButton>
                </li>
                {/if}
            </ul>
    
            <IconButton on:click={toggleShowNav} styles="lg:hidden text-4xl bg-transparent flex w-10 justify-center items-center px-0 text-base-color2">
                <Icon icon="mdi:hamburger-open" />
            </IconButton>
        </div>
    </nav>     
</header>