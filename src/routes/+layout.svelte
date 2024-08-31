<script>
  import Header from '$lib/components/layout/Header.svelte';
  import Alert from '$lib/components/prompts/Alert.svelte';
  import '../app.css';
  import { page } from '$app/stores';
  import Footer from '$lib/components/layout/Footer.svelte';
  import CustomImagePreviewModal from '$lib/components/modals/CustomImagePreviewModal.svelte';
  import { hasUnsavedChanges } from '../store';
  import DiscardChangesModal from '$lib/components/modals/DiscardChangesModal.svelte';
  import { beforeNavigate, goto } from '$app/navigation';
  import BuyMeACoffeeModal from '$lib/components/layout/BuyMeACoffeeModal.svelte';

  export let data;
  $: ({ beenAuthenticated, supabase, user } = data)

  const pageTitle = 'Bill-Blitz';
  const pageDescription = 'Create fast and easy bills (invoices and receipts)';
  let redirectUrl = '';
  let showDiscardModal = false;

  // Function to handle the navigation process
  function handleNavigation(to, cancel) {
    if ($hasUnsavedChanges && to.url) {
      redirectUrl = to.url?.pathname;
      showDiscardModal = true;
      cancel()
    } else {
      showDiscardModal = false;
    }
  }

  function discardChanges() {
    hasUnsavedChanges.set(false)
    showDiscardModal = false;
    goto(redirectUrl)
  }

  // Function to handle the "Cancel" button click
  function cancelNavigation() {
    showDiscardModal = false;
  }

  beforeNavigate((navigation) => {
    handleNavigation(navigation.to, navigation.cancel)
  })

</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <meta property="og:title" content={pageTitle} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta property="og:description" content={pageDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:image" content="/icons/logo.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />
  <meta name="twitter:image" content="/icons/logo.png" />
</svelte:head>

<!-- HEADER -->
{#if !$page.url.pathname.match("/generate/invoice/builder")}
  <Header beenAuthenticated={beenAuthenticated} {user} {supabase}  />
{/if}
<!-- POPUPS -->
<Alert />
<CustomImagePreviewModal />
{#if !$page.url.pathname.match("/generate/")}
  <BuyMeACoffeeModal />
{/if}

<!-- PAGES -->
<slot {user} />
<!-- FOOTER -->
{#if !$page.url.pathname.match("/auth/create_account") && !$page.url.pathname.match("/generate/invoice/builder")}
  <Footer />
{/if}

<DiscardChangesModal
  showDiscardModal={showDiscardModal}
  onConfirm={discardChanges}
  onCancel={cancelNavigation}
/>
