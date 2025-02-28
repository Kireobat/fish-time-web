<script lang="ts">
    import { meetingApi } from "$lib/api/apiClient";
    import { createMeeting } from "$lib/functions/create/createMeeting";
    import { getRooms } from "$lib/functions/get/getRooms";
    import type {
        CreateMeetingDto,
        FishTimePageDtoRoomDto,
        RoomDto,
    } from "$lib/generated/fish-time";
    import {
        Button,
        Heading,
        Input,
        Label,
        Modal,
        P,
        Search,
    } from "flowbite-svelte";
    import { onMount } from "svelte";

    let open = $state(false);

    let roomPageDto: FishTimePageDtoRoomDto | undefined = $state();
    let searchQuery = $state("");
    let minimumCapacity = $state(0);

    let title = $state("");
    let description = $state("");
    let startTime: Date | undefined = $state();
    let endTime: Date | undefined = $state();
    let roomDto: RoomDto | undefined = $state();
    let participants: number[] = $state([]);

    onMount(async () => {
        roomPageDto = await getRooms(
            0,
            1000,
            ["id,ASC"],
            undefined,
            searchQuery,
            minimumCapacity,
        );
    });

    $effect(() => {
        const fetchRooms = async () => {
            roomPageDto = await getRooms(
                0,
                10,
                ["id,ASC"],
                undefined,
                searchQuery,
                minimumCapacity,
            );
        };
        fetchRooms();
    });

    $effect(() => {
        searchQuery = roomDto?.name ?? "";
        console.log(roomDto?.id);
    });

    const handleCreateMeeting = async () => {
        const createMeetingDto: CreateMeetingDto = {
            title: title,
            description: description,
            startTime: startTime ? new Date(startTime) : undefined,
            endTime: endTime ? new Date(endTime) : undefined,
            roomId: roomDto?.id,
        };

        createMeeting(createMeetingDto);
    };
</script>

<Button onclick={() => (open = true)}>Create Meeting</Button>

<Modal bind:open autoclose outsideclose>
    <form>
        <Heading tag="h4" class="mb-8">Create a new meeting</Heading>
        <div class="flex flex-col gap-4">
            <div>
                <Label for="title">Title</Label>
                <Input type="text" id="title" required bind:value={title} />
            </div>
            <div>
                <Label for="description">Description</Label>
                <Input type="text" id="description" bind:value={description} />
            </div>
            <div class="flex space-x-4 justify-between">
                <div class="w-full">
                    <Label for="start_time">Start time</Label>
                    <Input
                        type="datetime-local"
                        id="start_time"
                        required
                        bind:value={startTime}
                    />
                </div>
                <div class="w-full">
                    <Label for="end_time">End time</Label>
                    <Input
                        type="datetime-local"
                        id="end_time"
                        required
                        bind:value={endTime}
                    />
                </div>
            </div>
            <div>
                <Label for="room">Room</Label>
                <Search bind:value={searchQuery} />
                <div class="flex justify-between mb-2">
                    <P>Filters</P>
                    <div>
                        <Label for="min_capacity">Minimum Capacity</Label>
                        <Input
                            type="number"
                            id="min_capacity"
                            bind:value={minimumCapacity}
                        />
                    </div>
                </div>
                <hr class="mb-2" />
                {#if roomPageDto && roomPageDto.page && roomPageDto.page.length > 0}
                    <div class="grid grid-cols-2 gap-4">
                        {#each roomPageDto?.page as room}
                            {#if room.id != undefined}
                                <button onclick={() => (roomDto = room)}>
                                    <div>{room.name}</div>
                                </button>
                            {/if}
                        {/each}
                    </div>
                {:else}
                    <P>No rooms found</P>
                {/if}
            </div>
            <div>
                <Label for="participants">Participants</Label>
                <Input type="text" id="participants" />
            </div>
            <div>
                <Button type="submit" onclick={handleCreateMeeting}
                    >Create</Button
                >
            </div>
        </div>
    </form>
</Modal>
