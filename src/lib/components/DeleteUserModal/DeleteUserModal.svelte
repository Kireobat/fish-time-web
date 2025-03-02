<script lang="ts">
    import { Modal, Button, Radio, P } from "flowbite-svelte";
    import type { DeleteUserRequest, UserDto } from "$lib/generated/fish-time";
    import { deleteUser } from "$lib/functions/delete/deleteUser";
    import { TrashBinOutline } from "flowbite-svelte-icons";

    interface EditProfileModalProps {
        user: UserDto;
    }

    let { user }: EditProfileModalProps = $props();

    let deleteMode = $state("soft");

    const handleDeleteProfile = async () => {
        if (
            confirm(
                "Are you sure you want to delete this account? This action is irreversible.",
            )
        ) {
            const deleteUserRequest: DeleteUserRequest = {
                id: user.id!!,
                dataWipe: deleteMode === "hard",
            };

            await deleteUser(deleteUserRequest);
        }
    };

    let open = $state(false);
</script>

<Button color="red" onclick={() => (open = true)}>
    <TrashBinOutline />
    Delete Account
</Button>

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
                    class="p-3">Only delete account</Radio
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
                    The account will be deleted but data will be retained in the
                    system. Anything the account has created will be attributed
                    to 'DELETED'. Deleting data will not be possible after this.
                {:else}
                    The account and all associated data will be permanently
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
                    Delete the account
                {:else}
                    Delete all data
                {/if}</Button
            >
        </div>
    </div>
</Modal>
