<script>
    import Header from '$lib/components/Header.svelte';
    import Alert from '$lib/components/prompts/Alert.svelte';
    import '../app.css';
</script>

<Header />
<Alert />

<slot />