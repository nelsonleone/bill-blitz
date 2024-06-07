<script lang="ts">

    let searchValue = "";
</script>

<main>
    <h1>Invoices</h1>

    <div>
        <input
          type="text"
          bind:value={searchValue}
          placeholder=""
        />
    </div>
</main>