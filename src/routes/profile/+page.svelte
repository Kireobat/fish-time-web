<script lang="ts">
    import { user } from "$lib/functions/user.svelte";
    import { Button, Card, Avatar, Heading } from "flowbite-svelte";
    import { PenOutline, TrashBinOutline } from "flowbite-svelte-icons";
    import EditProfileModal from "$lib/components/EditProfileModal/EditProfileModal.svelte";
    import { onMount } from "svelte";
    import { feedback } from "$lib/functions/feedback.svelte";
    import DeleteProfileModal from "$lib/components/DeleteProfileModal/DeleteProfileModal.svelte";

    let deleteProfileModalOpen = $state(false);
    let editProfileModalOpen = $state(false);
</script>

<div class="container mx-auto px-4 py-8">
    <Card class="max-w-xl mx-auto">
        {#if user.current}
            <div class="flex flex-col items-center pb-6">
                <Avatar size="xl" alt="Profile picture" class="mb-4" />
                <Heading tag="h4" class="mb-1"
                    >{user.current.username || "User"}</Heading
                >
                <p class="text-gray-500 mb-4">
                    {user.current.email || "No email provided"}
                </p>

                <div class="flex gap-3 mb-6">
                    <EditProfileModal bind:open={editProfileModalOpen}>
                        <Button
                            color="blue"
                            onclick={() => (editProfileModalOpen = true)}
                        >
                            <PenOutline />
                            Edit Profile
                        </Button>
                    </EditProfileModal>

                    <DeleteProfileModal bind:open={deleteProfileModalOpen}>
                        <Button
                            color="red"
                            onclick={() => (deleteProfileModalOpen = true)}
                        >
                            <TrashBinOutline />
                            Delete Account
                        </Button>
                    </DeleteProfileModal>
                </div>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h5 class="text-lg font-semibold mb-3">Profile Information</h5>

                <div class="space-y-3">
                    {#if user.current.createdTime}
                        <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span class="block font-medium text-sm mb-1"
                                >Member Since</span
                            >
                            <span class="text-gray-600 dark:text-gray-300">
                                {new Date(
                                    user.current.createdTime,
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    {/if}
                </div>
            </div>
        {:else}
            <div class="text-center p-6">
                <p class="text-gray-500">User information not available</p>
            </div>
        {/if}
    </Card>
</div>
