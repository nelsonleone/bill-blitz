<script>
    export let error = '';
</script>

{#if errorMessage}
    <p class="error-message">{errorMessage}</p>
{/if}

<style>
    .error-message {
        color: red;
        font-size: 0.9rem;
        margin-top: 0.5rem;
    }
</style>