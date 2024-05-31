<script>
  import Header from '$lib/components/layout/Header.svelte';
  import Alert from '$lib/components/prompts/Alert.svelte';
  import '../app.css';
  import { page } from '$app/stores';
  import { alertStore } from '../store';
  import { AlertSeverity } from '../enums';
  import Footer from '$lib/components/layout/Footer.svelte';

  export let data;
  $: ({ beenAuthenticated, user } = data)

  $:{
    console.log(user.user_metadata)
  }

  const pageTitle = 'Bill-Blitz';
  const pageDescription = 'Create fast and easy bills (invoices and receipts)';
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:image" content="/icons/logo.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />
  <meta name="twitter:image" content="/icons/logo.png" />
</svelte:head>

<Header beenAuthenticated={beenAuthenticated} user={user}  />
<Alert />
<slot />
{#if !$page.url.pathname.match("/auth/create_account")}
  <Footer />
{/if}