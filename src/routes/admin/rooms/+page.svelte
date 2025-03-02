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
    } from "flowbite-svelte";
    import { TrashBinOutline } from "flowbite-svelte-icons";
    import { getRooms } from "$lib/functions/get/getRooms";
    import type { FishTimePageDtoRoomDto } from "$lib/generated/fish-time";
    import { deleteRoom } from "$lib/functions/delete/deleteRoom";
    import EditRoomModal from "$lib/components/EditRoomModal/EditRoomModal.svelte";
    import CreateRoomModal from "$lib/components/CreateRoomModal/CreateRoomModal.svelte";

    let roomPageDto: FishTimePageDtoRoomDto | undefined = $state();
    let loading = $state(true);
    let error: string | null = $state(null);

    let createRoomModalOpen = $state(false);

    onMount(async () => {
        try {
            roomPageDto = await getRooms(0, 10, ["id,ASC"]);
        } catch (e) {
            error = e instanceof Error ? e.message : "Failed to fetch rooms";
        } finally {
            loading = false;
        }
    });

    async function handleDeleteRoom(id: number) {
        if (confirm("Are you sure you want to delete this room?")) {
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
    <h1 class="text-2xl font-bold mb-6">Manage Rooms</h1>

    {#if loading}
        <div class="flex justify-center">
            <Spinner size="xl" />
        </div>
    {:else if $error}
        <Alert color="red" class="mb-4">
            <span class="font-medium">Error:</span>
            {$error}
        </Alert>
    {:else if roomPageDto === undefined || roomPageDto.page === undefined || roomPageDto.totalItems === 0}
        <Alert class="mb-4">No rooms found.</Alert>
    {:else}
        <Table striped={true}>
            <TableHead>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Capacity</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <TableBody>
                {#each roomPageDto.page as room (room.id)}
                    <TableBodyRow>
                        <TableBodyCell>{room.id}</TableBodyCell>
                        <TableBodyCell>{room.name}</TableBodyCell>
                        <TableBodyCell>{room.capacity}</TableBodyCell>
                        <TableBodyCell class="flex gap-2">
                            <EditRoomModal {room} />

                            <Button
                                color="red"
                                size="sm"
                                onclick={() => handleDeleteRoom(room.id!!)}
                            >
                                <TrashBinOutline class="mr-2 h-4 w-4" />Delete
                            </Button>
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    {/if}

    <div class="mt-6">
        <CreateRoomModal bind:open={createRoomModalOpen}>
            <Button color="blue" onclick={() => (createRoomModalOpen = true)}
                >Create New Room</Button
            ></CreateRoomModal
        >
    </div>
</div>
