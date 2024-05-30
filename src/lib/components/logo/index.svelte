<script lang="ts">
    export let styles;
    export let logoFor : "footer" | "header" = "header";
</script>

<div aria-label="bill-blitz logo" class={styles}>
    <img src={`/icons/${logoFor === "footer" ? "logo2.png" : "logo.png"}`} alt="logo" class="inline-block" />
</div>