<script>
    import Header from '$lib/components/layout/Header.svelte';
    import Alert from '$lib/components/prompts/Alert.svelte';
    import '../app.css';
    import { page } from '$app/stores';

    export let data;
    $: ({ session, supabase, user } = data)
  
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

<Header />
<Alert />
<slot />