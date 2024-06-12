<script lang="ts">
    import { page } from "$app/stores";
    import Logo from "../logo/index.svelte";
    import Icon from "@iconify/svelte";
    import IconButton from "$lib/components/buttons/IconButton.svelte";
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import { browser } from '$app/environment';
    import { clickOutside } from "$lib/helperFns/clickOutside";
    import { onMount } from "svelte";
    import type { User } from "@supabase/supabase-js";
    import UserAvatar from "./UserAvatar.svelte";
    import { fade } from "svelte/transition";
    import { DropdownMenu } from "bits-ui";
    import { showNav } from "../../../store";
    import { handleHideNavOnNavigation } from "$lib/helperFns/handleHideNavOnNavigation";
    import { Breapoints } from "../../../enums";

    export let beenAuthenticated;
    export let user : User | null;

    let windowInnerWidth = Breapoints.Desktop;
    let scrolledIn:boolean;

    $: activeUrl = $page.url.pathname;

    $: {
        if(browser){
            handleHideNavOnNavigation($page.url.pathname)
        }
    }


    const handleScroll = () => {
        if(!browser)return;

        showNav.set(windowInnerWidth < Breapoints.Desktop && false)

        if (window.scrollY > window.innerHeight * 1.1) {
            scrolledIn = true;
        } else {
            scrolledIn = false;
        }
    }


    onMount(() => {
        if (browser) {
            
            window.addEventListener('scroll',handleScroll)

            windowInnerWidth = window.innerWidth;
            const handleResize = () => {
                windowInnerWidth = window.innerWidth;
            }
            window.addEventListener('resize', handleResize)
    
            return () => {
                window.removeEventListener('resize', handleResize)
                window.removeEventListener('scroll',handleScroll)
            }
        }
    })


    const toggleShowNav = (e: MouseEvent) => {
        e.stopPropagation()
        showNav.set($showNav ? false : true)
    }

</script>


<header class={`fixed z-50 top-0 w-full transition-all drop-shadow-lg left-0 duration-300 ease-in-out ${scrolledIn ? '-translate-y-full' : 'translate-y-0'}`}>
    <nav class="px-4 lg:px-8 h-20 bg-base-color1 w-full flex items-center justify-between">
        <a href="/">
            <Logo styles="w-20 lg:w-[5.5em]" />
        </a>
 
        <ul class="hidden lg:flex h-44 lg:h-auto w-5/12 justify-end gap-12 text-primary-dark-blue">
            <li>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger class={`font-medium drop-shadow-none hover:text-green-300 lg:hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl.match("/generate") ? "text-primary-accent-color2" : ""}`}>
                        Generate
                    </DropdownMenu.Trigger>
                   
                    <DropdownMenu.Content class="relative left-0 top-0 w-36 gap-3 px-1 py-4 flex text-primary-very-dark-blue flex-col items-center z-50 rounded-md bg-base-color1 shadow-2xl">
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

            <li class={`font-medium drop-shadow-none hover:text-green-300 lg:hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/templates" ? "text-primary-accent-color2" : ""}`}><a href="/templates">Templates</a></li>
            <li class={`font-medium drop-shadow-none hover:text-green-300 lg:hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/about" ? "text-primary-accent-color2" : ""}`}><a href="/about">About Us</a></li>
            <li class={`font-medium drop-shadow-none hover:text-green-300 lg:hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/how-it-works" ? "text-primary-accent-color2" : ""}`}><a href="/how-it-works">How It Works</a></li>
        </ul>

        <div class="flex items-center gap-3">
            <ul>
                {#if beenAuthenticated}
                    <div class="flex justify-between gap-4 md:gap-8 items-center">
                        {#if !user?.user_metadata.pro_user}
                            <li><a href="/account/upgrade" class="hidden md:block w-[5.5em] py-[.55em] rounded-3xl text-base-color1 bg-custom-dark-green text-center hover:shadow-lg hover:bg-transparent hover:text-custom-dark-green focus:text-custom-dark-green hover:border hover:border-custom-dark-green focus:drop-shadow-md focus:shadow-lg focus:bg-transparent focus:outline focus:outline-1 transition ease-linear duration-300 focus:outline-custom-dark-green hover:drop-shadow-md">Upgrade</a></li>
                        {/if}

                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <UserAvatar user={user} />
                            </DropdownMenu.Trigger>
                           
                            <DropdownMenu.Content class="absolute z-50 bg-gray-100 rounded-md text-primary-very-dark-blue shadow-2xl px-3 pt-8 pb-4">
                              <DropdownMenu.Item class="text-primary-accent-color2">
                                  <span>{user?.email}</span>
                              </DropdownMenu.Item>
                              <DropdownMenu.Item>
                                  <CustomButton styles="bg-primary-accent-color3 my-4 text-base-color1 w-full">Delete Account</CustomButton>
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>
                  {:else}
                  <li>
                        <CustomButton styles="block bg-custom-dark-green py-[.55em] rounded-sm hover:opacity-90 focus:outline focus:outline-2 focus:outline-custom-dark-green focus:text-primary-dark-blue focus:bg-transparent transition duration-200 ease-linear" href="/auth/sign_in">
                            Sign In
                        </CustomButton>
                  </li>
                {/if}
            </ul>
    
            <IconButton ariaControls="mobile-nav" ariaExpanded={$showNav ? "true" : "false"} on:click={toggleShowNav} styles="lg:hidden text-4xl bg-transparent flex w-9 justify-center items-center px-0 text-base-color2">
               
                {#if !$showNav}
                  <span in:fade="{{delay: 100, duration: 500}}">
                    <Icon icon=mdi:hamburger-open />
                  </span>
                  {:else}
                  <span in:fade="{{delay: 100, duration: 500}}">
                    <Icon icon="ic:outline-close" />
                  </span>
                {/if}
                
            </IconButton>
        </div>
    </nav>     
</header>


<nav         
    use:clickOutside={() => {
    showNav.set(false);
    }}
    class={`fixed z-40 lg:hidden shadow-lg shadow-gray-400 backdrop-blur-xl drop-shadow-3xl bg-custom-dark-green  text-base-color1 px-4 pt-10 h-44 w-full left-0 top-20 md:px-36  transition-all duration-500 ease-in-out transform ${$showNav ? 'translate-y-0 opacity-100' : 'opacity-80 -translate-y-[50em]'}`}
    >
    <ul class="flex justify-between">
        <li class="lg:hidden">
            <span class="text-gray-400">Generate</span>
            <ul class="ps-3 mt-2">
                <li class={`mb-4 font-medium hover:text-green-300 lg:hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/generate/invoice" ? "text-primary-accent-color2" : ""}`}>
                    <a href="/generate/invoice" class="font-medium">Invoice</a>
                </li>
                <li class={`font-medium hover:text-green-300 lg:hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/generate/receipt" ? "text-primary-accent-color2" : ""}`}>
                    <a href="/generate/receipt" class="font-medium">Receipt</a>
                </li>
            </ul>
        </li>

        <div class="flex flex-col gap-4 items-center">
            <li class={`font-medium hover:text-green-300 lg:hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/about" ? "text-primary-accent-color1" : ""}`}><a href="/about">About Us</a></li>
            <li><a href="/account/upgrade" class="block w-[5.5em] py-[.55em] rounded-3xl text-base-color1 text-center hover:shadow-lg hover:bg-transparent hover:text-base-color1 focus:text-base-color1 border border-base-color1 focus:drop-shadow-md focus:shadow-lg transition ease-linear duration-300 hover:drop-shadow-md">Upgrade</a></li>
        </div>
        
        <div class="flex flex-col gap-4 items-center">
            <li class={`font-medium hover:text-green-300 lg:hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/templates" ? "text-primary-accent-color1" : ""}`}><a href="/templates">Templates</a></li>
            <li class={`font-medium hover:text-green-300 lg:hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/how-it-works" ? "text-primary-accent-color1" : ""}`}><a href="/how-it-works">How It Works</a></li>
        </div>
    </ul>
</nav>