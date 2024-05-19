<script lang="ts">
    import AuthPageInput from "$lib/inputs/AuthPageInput.svelte";
import { authPageInputData } from "$lib/inputs/authPageFormData";

</script>
<main>
    <section>
        <div>
            <h1>Welcome Back</h1>
            <p>Sign in to save time and effort with our intuitive invoicing and receipt generation features.</p>
            <form>
                {#each authPageInputData as inputData (inputData.id) }
                  <AuthPageInput inputProps={{...inputData}} />
                {/each}
            </form>
        </div>

        <div>
            <img src="/images/signin-page-image.jpeg" alt="a man in office" />
        </div>
    </section>
</main>