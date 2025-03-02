<script lang="ts">
    import { isAdmin } from "$lib/functions/auth/isAdmin";
    import { feedback } from "$lib/functions/feedback.svelte";
    import { onMount } from "svelte";

    let { children } = $props();

    let isAuthorized: boolean | undefined = $state();

    onMount(async () => {
        isAuthorized = await isAdmin();
        console.log(isAuthorized);
        if (!isAuthorized) {
            window.location.href = "/";
            feedback.current.push({
                type: "error",
                message: "You are not authorized to view this page",
            });
        }
    });
</script>

{#await isAuthorized}
    <div>Loading...</div>
{:then auth}
    {#if auth === true}
        {@render children()}
    {/if}
{/await}
