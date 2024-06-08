<script lang="ts">
    import CompanyLogoUpload from "$lib/components/inputs/CompanyLogoUpload.svelte";


    let uploadedLogo : string | null;
</script>

<form class="bg-white shadow-md">
    <div>
        <CompanyLogoUpload {uploadedLogo} />

    </div>
</form>