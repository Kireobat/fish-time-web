<script lang="ts">
    import { onMount } from "svelte";
    import {
        Button,
        Table,
        Spinner,
        Alert,
        TableBody,
        TableHead,
        TableHeadCell,
        TableBodyCell,
        TableBodyRow,
        Heading,
    } from "flowbite-svelte";
    import { TrashBinOutline } from "flowbite-svelte-icons";
    import { getRooms } from "$lib/functions/get/getRooms";
    import type {
        FishTimePageDtoRoomDto,
        FishTimePageDtoUserDto,
    } from "$lib/generated/fish-time";
    import { deleteRoom } from "$lib/functions/delete/deleteRoom";
    import EditRoomModal from "$lib/components/EditRoomModal/EditRoomModal.svelte";
    import { getUsers } from "$lib/functions/get/getUsers";
    import EditUserModal from "$lib/components/EditUserModal/EditUserModal.svelte";
    import DeleteUserModal from "$lib/components/DeleteUserModal/DeleteUserModal.svelte";
    import CreateUserModal from "$lib/components/CreateUserModal/CreateUserModal.svelte";

    let userPageDto: FishTimePageDtoUserDto | undefined = $state();
    let loading = $state(true);
    let error: string | null = $state(null);

    let createUserModalOpen = $state(false);

    onMount(async () => {
        try {
            userPageDto = await getUsers(0, 10, ["id,ASC"]);
        } catch (e) {
            error = e instanceof Error ? e.message : "Failed to fetch rooms";
        } finally {
            loading = false;
        }
    });

    async function handleDeleteRoom(id: number) {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteRoom(id);
            } catch (e) {
                alert(
                    `Error: ${e instanceof Error ? e.message : "Failed to delete room"}`,
                );
            }
        }
    }
</script>

<div class="container mx-auto p-4">
    <Heading class="text-2xl font-bold mb-6">Manage Users</Heading>

    {#if loading}
        <div class="flex justify-center">
            <Spinner size="xl" />
        </div>
    {:else if $error}
        <Alert color="red" class="mb-4">
            <span class="font-medium">Error:</span>
            {$error}
        </Alert>
    {:else if userPageDto === undefined || userPageDto.page === undefined || userPageDto.totalItems === 0}
        <Alert class="mb-4">No rooms found.</Alert>
    {:else}
        <Table striped={true}>
            <TableHead>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Created</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <TableBody>
                {#each userPageDto.page as user}
                    <TableBodyRow>
                        <TableBodyCell>{user.id}</TableBodyCell>
                        <TableBodyCell>{user.username}</TableBodyCell>
                        <TableBodyCell>{user.email}</TableBodyCell>
                        <TableBodyCell
                            >{user.createdTime?.toLocaleDateString()}</TableBodyCell
                        >
                        <TableBodyCell class="flex gap-2">
                            <EditUserModal {user} />
                            <DeleteUserModal {user} />
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    {/if}

    <div class="mt-6">
        <CreateUserModal bind:open={createUserModalOpen}>
            <Button color="blue" onclick={() => (createUserModalOpen = true)}
                >Create New Users</Button
            >
        </CreateUserModal>
    </div>
</div>
