<script lang="ts">
    import { Modal, Label, Input, Button, Checkbox } from "flowbite-svelte";
    import type { Snippet } from "svelte";
    import type { RoomDto, UpdateRoomDto } from "$lib/generated/fish-time";
    import { patchRoom } from "$lib/functions/patch/patchRoom";
    import { PenOutline } from "flowbite-svelte-icons";

    interface EditRoomModalProps {
        room: RoomDto;
    }

    let { room }: EditRoomModalProps = $props();

    let name = $state(room.name);
    let address = $state(room.address);
    let capacity = $state(room.capacity);
    let active = $state(room.active);

    const handleEditRoom = async () => {
        const updateRoomDto: UpdateRoomDto = {
            id: room.id,
            name: name,
            address: address,
            capacity: capacity,
            active: active,
        };

        await patchRoom(updateRoomDto);
    };

    let open = $state(false);
</script>

<Button color="green" size="sm" onclick={() => (open = true)}>
    <PenOutline class="mr-2 h-4 w-4" />Edit
</Button>

<Modal title="Edit Profile" bind:open autoclose outsideclose>
    <div class="p-6">
        <div>
            <Label for="name">Name</Label>
            <Input id="name" bind:value={name} />
        </div>

        <div>
            <Label for="address">Address</Label>
            <Input id="adress" type="text" bind:value={address} />
        </div>
        <div>
            <Label for="capacity">Capacity</Label>
            <Input id="capacity" type="number" bind:value={capacity} />
        </div>
        <div>
            <Label for="active">Active</Label>
            <Checkbox id="active" bind:checked={active} />
        </div>

        <div class="flex justify-end mt-6">
            <Button color="blue" onclick={handleEditRoom}>Save Changes</Button>
        </div>
    </div>
</Modal>
