<script lang="ts">
    import { user } from "$lib/functions/user.svelte";
    import { Card, Avatar, Heading } from "flowbite-svelte";
    import EditProfileModal from "$lib/components/EditUserModal/EditUserModal.svelte";
    import DeleteProfileModal from "$lib/components/DeleteUserModal/DeleteUserModal.svelte";

    function formatDate(date: Date | undefined): string {
        if (!date) return "";
        return date.toLocaleString("nb-NO", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }
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
                    <EditProfileModal user={user.current} />
                    <DeleteProfileModal user={user.current} />
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
                                {formatDate(user.current.createdTime)}
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
