<script lang="ts">
    import { page } from "$app/stores";
    import Logo from "../logo/index.svelte";
    import Icon from "@iconify/svelte";
    import IconButton from "$lib/components/buttons/IconButton.svelte";
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import { browser } from '$app/environment';
    import { clickOutside } from "$lib/helperFns/clickOutside";
    import { onMount } from "svelte";
    import type { SupabaseClient, User } from "@supabase/supabase-js";
    import UserAvatar from "./UserAvatar.svelte";
    import { fade } from "svelte/transition";
    import { DropdownMenu } from "bits-ui";
    import { alertStore, showNav } from "../../../store";
    import { handleHideNavOnNavigation } from "$lib/helperFns/handleHideNavOnNavigation";
    import { AlertSeverity, Breapoints } from "../../../enums";
    import { goto } from "$app/navigation";
    import DeleteAccountPrompt from "../modals/DeleteAccountPrompt.svelte";

    export let beenAuthenticated;
    export let supabase : SupabaseClient;
    export let user : User | null;

    let windowInnerWidth = Breapoints.Desktop;
    let scrolledIn:boolean;
    let showDeleteAccountPrompt = false;
    let deletingAccount = false;
    let showUserActionMenu = false;
    let menuRef: HTMLElement | null = null;
    
    $: activeUrl = $page.url.pathname;
    
    $: {
        if(browser){
            handleHideNavOnNavigation($page.url.pathname)
        }
    }

    const handleClickOutside = (event:MouseEvent) => {
        if (menuRef && !menuRef.contains(event.target as Node)) {
            showUserActionMenu = false;
        }
    }

    const handleCloseUserActionMenuOnScroll = () => {
        showUserActionMenu = false;
    }
    
    onMount(() => {
        document.addEventListener("click", handleClickOutside)
        document.addEventListener("scroll", handleCloseUserActionMenuOnScroll)

        return () => {
            document.removeEventListener("click", handleClickOutside)
            document.removeEventListener("scroll", handleCloseUserActionMenuOnScroll)
        }
    })

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

    const handleSignOut = async() => {
        await supabase.auth.signOut()

        alertStore.set({
            mssg: "Signed Out",
            severity: AlertSeverity.SUCCESS
        })

        window.location.reload()
    }

    const handleDeleteAccount = async () => {
        const user_id = (await supabase.auth.getUser()).data.user?.id;

        if (user_id) {
            try {
                deletingAccount = true;
                // Delete the user's account
                await supabase.rpc('delete_user')

                const { error: invoiceError } = await supabase
                    .from('user_invoices')
                    .delete()
                    .eq('user_id', user_id)

                if (invoiceError) {
                    throw new Error("Error deleting user invoices: " + invoiceError.message)
                }

                await supabase.auth.signOut()


                alertStore.set({
                    mssg: "Your account and all related invoices have been deleted",
                    severity: AlertSeverity.SUCCESS
                })

                goto("/")

            } catch (err:any) {
                alertStore.set({
                    mssg: err.message || "Error Deleting Account",
                    severity: AlertSeverity.ERROR
                })
            }

            finally{
                deletingAccount = false;
            }
        }
    }


</script>


<header class={`fixed z-50 top-0 w-full transition-all drop-shadow-lg left-0 duration-300 ease-in-out ${scrolledIn ? '-translate-y-full' : 'translate-y-0'}`}>
    <nav class="px-4 md:px-8 xl:px-16 h-20 bg-base-color1 w-full flex items-center justify-between">
        <a href="/">
            <Logo styles="w-20 lg:w-[5.5em]" />
        </a>
 
        <ul class="hidden lg:flex h-44 lg:h-auto w-[47%] justify-end gap-12 text-primary-dark-blue">
            <li>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger class="font-medium drop-shadow-none hover:text-green-300 lg:hover:text-primary-accent-color2 text-primary-dark-blue transition ease-linear duration-200">
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

            <li class={`font-medium drop-shadow-none hover:text-green-300 lg:hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/generate/invoice/templates" ? "text-primary-accent-color2" : ""}`}><a href="/generate/invoice/templates">Templates</a></li>
            <li class={`font-medium drop-shadow-none hover:text-green-300 lg:hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/about" ? "text-primary-accent-color2" : ""}`}><a href="/about">About Us</a></li>
        </ul>

        <div class="flex items-center gap-3">
            <ul>
                {#if beenAuthenticated}
                    <div bind:this={menuRef}>
                        <DeleteAccountPrompt 
                           {handleDeleteAccount}
                           {deletingAccount}
                           on:setShowDeleteAccountPrompt={(e) => showDeleteAccountPrompt = e.detail}
                           {showDeleteAccountPrompt}
                        />

                        
                        <div class="relative">
                            <button on:click={() => showUserActionMenu = !showUserActionMenu}>
                                <UserAvatar user={user} />
                            </button>
                        
                            {#if showUserActionMenu}
                                <div class="absolute z-50 bg-emerald-900 rounded-md min-w-fit -translate-x-52 mx-auto text-base-color1 shadow-2xl px-3 pt-8 pb-4">
                                    <div class="flex items-center gap-4 mb-4">
                                        <Icon class="text-2xl" icon="mage:email" />
                                        <span>{user?.user_metadata.display_name || user?.user_metadata.full_name}</span>
                                    </div>
                                    <div class="flex items-center gap-4 mb-4">
                                        <Icon class="text-2xl" icon="zondicons:user" />
                                        <span>{user?.email}</span>
                                    </div>
                                    <div class="flex justify-center my-6">
                                        <CustomButton on:click={handleSignOut} styles="bg-primary-accent-color3 py-3 h-12 text-base-color1 w-52 hover:opacity-80">
                                            Sign Out
                                        </CustomButton>
                                    </div>
                                    <button 
                                        disabled={deletingAccount}
                                        on:click={() => {
                                            showDeleteAccountPrompt = true;
                                            showUserActionMenu = false;
                                        }} 
                                        class="font-medium text-center mx-auto block hover:underline focus:underline"
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            {/if}
                        </div>                        
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
        </div>
        
        <div class="flex flex-col gap-4 items-center">
            <li class={`font-medium hover:text-green-300 lg:hover:text-primary-accent-color2 transition ease-linear duration-200 ${activeUrl === "/generate/invoice/templates" ? "text-primary-accent-color1" : ""}`}><a href="/generate/invoice/templates">Templates</a></li>
        </div>
    </ul>
</nav>