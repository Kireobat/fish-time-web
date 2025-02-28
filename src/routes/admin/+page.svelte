<script lang="ts">
    import {
        Button,
        Label,
        Input,
        Textarea,
        Select,
        Spinner,
        Checkbox,
        Avatar,
    } from "flowbite-svelte";
    import { roomApi } from "$lib/api/apiClient";
    import type { CreateRoomDto } from "$lib/generated/fish-time";

    let isSubmitting = $state(false);
    let name = $state("");
    let capacity = $state(0);
    let address = $state("");
    let active = $state(false);

    const handleCreateRoom = async () => {
        isSubmitting = true;

        const createRoomDto: CreateRoomDto = {
            name: name,
            capacity: capacity,
            address: address,
            active: active,
        };

        await roomApi.createRoom({ createRoomDto: createRoomDto });
        isSubmitting = false;
    };
</script>

<div
    class="p-6 max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md"
>
    <h2 class="text-2xl font-bold mb-6">Create New Room</h2>

    <form class="space-y-4">
        <div>
            <Label for="name">Room Name</Label>
            <Input
                id="name"
                placeholder="Enter room name"
                bind:value={name}
                required
            />
        </div>

        <div>
            <Label for="address">Address</Label>
            <Input
                type="text"
                id="address"
                placeholder="Room address"
                bind:value={address}
            />
        </div>

        <div>
            <Label for="capacity">Capacity</Label>
            <Input
                id="capacity"
                type="number"
                min="1"
                bind:value={capacity}
                required
            />
        </div>

        <div class="flex items-center mb-4">
            <Checkbox
                id="active"
                type="checkbox"
                bind:checked={active}
                class="w-4 h-4 text-blue-600"
            />
            <Label for="active" class="ml-2">Active</Label>
        </div>

        <Button
            type="submit"
            disabled={isSubmitting}
            onclick={handleCreateRoom}
            class="w-full"
        >
            {#if isSubmitting}
                <Spinner class="mr-2" size="sm" />
                Creating...
            {:else}
                Create Room
            {/if}
        </Button>
    </form>
</div>
