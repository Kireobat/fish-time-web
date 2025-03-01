<script lang="ts">
    import { Modal, Button, Radio, P } from "flowbite-svelte";
    import { user } from "$lib/functions/user.svelte";
    import type { Snippet } from "svelte";
    import type {
        DeleteUserRequest,
        UpdateUserDto,
    } from "$lib/generated/fish-time";
    import { patchUser } from "$lib/functions/patch/patchUser";
    import { deleteUser } from "$lib/functions/delete/deleteUser";

    interface EditProfileModalProps {
        children: Snippet<[]>;
        open: boolean;
    }

    let { children, open = $bindable(false) }: EditProfileModalProps = $props();

    let deleteMode = $state("soft");

    const handleDeleteProfile = async () => {
        if (
            confirm(
                "Are you sure you want to delete your profile? This action is irreversible.",
            )
        ) {
            const deleteUserRequest: DeleteUserRequest = {
                id: user.current?.id!!,
                dataWipe: deleteMode === "hard",
            };

            await deleteUser(deleteUserRequest);
        }
    };

    let softDelete = $state(true);
    let hardDelete = $state(false);
</script>

{@render children()}

<Modal title="Delete Profile" bind:open autoclose outsideclose>
    <div class="p-6">
        <p class="mb-4 font-semibold text-gray-900 dark:text-white">
            Deletion mode
        </p>
        <ul
            class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600"
        >
            <li class="w-full">
                <Radio
                    name="delete-type"
                    value="soft"
                    bind:group={deleteMode}
                    class="p-3">Only delete my account</Radio
                >
            </li>
            <li class="w-full">
                <Radio
                    name="delete-type"
                    value="hard"
                    bind:group={deleteMode}
                    class="p-3">Wipe all data</Radio
                >
            </li>
        </ul>

        <div class="mt-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
            <P class="mb-2 font-medium">
                {deleteMode === "soft" ? "Soft Delete" : "Hard Delete"}:
            </P>
            <P class="text-sm text-gray-600 dark:text-gray-300">
                {#if deleteMode === "soft"}
                    Your account will be deleted but your data will be retained
                    in the system. Anything you've created will be attributed to
                    'DELETED'. Deleting your data will not be possible after
                    this.
                {:else}
                    Your account and all associated data will be permanently
                    deleted from our system.
                {/if}
            </P>
        </div>

        <div class="flex justify-end gap-3 mt-6">
            <Button color="alternative" onclick={() => (open = false)}
                >Cancel</Button
            >
            <Button color="red" onclick={handleDeleteProfile}
                >{#if deleteMode === "soft"}
                    Delete my profile
                {:else}
                    Delete all data
                {/if}</Button
            >
        </div>
    </div>
</Modal>
