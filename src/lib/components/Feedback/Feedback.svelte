<script lang="ts">
    import { feedback } from "$lib/functions/feedback.svelte";
    import { Alert } from "flowbite-svelte";
    import {
        BugOutline,
        CheckOutline,
        ExclamationCircleOutline,
    } from "flowbite-svelte-icons";
</script>

<div class="absolute bottom-0 right-0 p-4 flex flex-col gap-4">
    {#each feedback.current as element}
        <Alert dismissable>
            <span class="flex gap-2">
                {#if element.type === "success"}
                    <CheckOutline />
                {:else if element.type === "info"}
                    <span class="font-medium">Info:</span>
                {:else if element.type === "warn"}
                    <ExclamationCircleOutline />
                {:else}
                    <BugOutline />
                {/if}
                {element.message}
            </span>
        </Alert>
    {/each}
</div>
