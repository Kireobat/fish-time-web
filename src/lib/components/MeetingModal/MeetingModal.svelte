<script lang="ts">
    import { isAdmin } from "$lib/functions/auth/isAdmin";
    import { deleteMeeting } from "$lib/functions/delete/deleteMeeting";
    import { getRooms } from "$lib/functions/get/getRooms";
    import { getUsers } from "$lib/functions/get/getUsers";
    import { patchMeeting } from "$lib/functions/patch/patchMeeting";
    import { user } from "$lib/functions/user.svelte";
    import type {
        FishTimePageDtoRoomDto,
        FishTimePageDtoUserDto,
        MeetingDto,
        ParticipantDto,
        RoomDto,
        UpdateMeetingDto,
    } from "$lib/generated/fish-time";
    import {
        Heading,
        Modal,
        P,
        Button,
        Input,
        Label,
        Search,
        Checkbox,
    } from "flowbite-svelte";
    import {
        CalendarMonthOutline,
        ClockOutline,
        UserOutline,
        MapPinOutline,
        EditOutline,
        ChevronDownOutline,
        TrashBinOutline,
    } from "flowbite-svelte-icons";
    import { onMount } from "svelte";

    interface MeetingModalProps {
        meeting: MeetingDto | undefined;
        open: boolean;
    }

    let { meeting, open = $bindable(false) }: MeetingModalProps = $props();
    let isAdminUser = $state(false);
    let inEditMode = $state(false);

    let title = $state(meeting?.title);
    let description = $state(meeting?.description);
    let startTime: Date | undefined = $state(meeting?.startTime);
    let endTime: Date | undefined = $state(meeting?.endTime);
    let roomDto: RoomDto | undefined = $state(meeting?.room);
    let meetingParticipants: ParticipantDto[] = $state(
        meeting?.participants || [],
    );

    let userPageDto: FishTimePageDtoUserDto | undefined = $state();
    let userSearchQuery = $state("");

    let roomPageDto: FishTimePageDtoRoomDto | undefined = $state();
    let roomSearchQuery = $state("");
    let minimumCapacity = $state(1);
    let activeOnly = $state(true);
    let roomAddress = $state("");
    let filtersVisible = $state(false);

    const toggleFilters = () => {
        filtersVisible = !filtersVisible;
    };

    function formatDate(date: Date | undefined): string {
        if (!date) return "";
        return date.toLocaleString("nb-NO", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    onMount(async () => {
        isAdminUser = await isAdmin();
        userPageDto = await getUsers(
            0,
            10,
            ["id,ASC"],
            undefined,
            userSearchQuery,
        );
        roomPageDto = await getRooms(
            0,
            10,
            ["id,ASC"],
            undefined,
            roomSearchQuery,
            minimumCapacity,
            undefined,
            activeOnly,
        );
    });

    $effect(() => {
        const fetchRooms = async () => {
            roomPageDto = await getRooms(
                0,
                10,
                ["id,ASC"],
                undefined,
                roomSearchQuery,
                minimumCapacity,
                undefined,
                activeOnly,
            );
        };
        fetchRooms();
    });

    $effect(() => {
        const fetchUsers = async () => {
            userPageDto = await getUsers(
                0,
                10,
                ["id,ASC"],
                undefined,
                userSearchQuery,
            );
        };
        fetchUsers();
    });

    $effect(() => {
        roomSearchQuery = roomDto?.name ?? "";
    });

    const handleDeleteMeeting = async () => {
        if (meeting) {
            if (
                confirm(
                    `Are you sure you want to delete the meeting "${meeting?.title}"?`,
                )
            ) {
                await deleteMeeting(meeting.id as number);
                open = false;
                window.location.reload();
            }
        }
    };

    const handleEditMeeting = async () => {
        const updateMeetingDto: UpdateMeetingDto = {
            id: meeting?.id,
            title: title,
            description: description,
            startTime: startTime,
            endTime: endTime,
            roomId: roomDto?.id,
        };

        await patchMeeting(updateMeetingDto);
        open = false;
        window.location.reload();
    };
</script>

<Modal bind:open outsideclose class="w-full max-w-2xl">
    {#if meeting}
        <div class="flex justify-between items-center mb-6 mr-8">
            {#if inEditMode}
                <div>
                    <Label for="title">Title</Label>
                    <Input id="title" type="text" bind:value={title} required />
                </div>
            {:else}
                <Heading tag="h3" class="text-xl font-bold"
                    >{meeting.title}</Heading
                >
            {/if}
            {#if user.current?.id === meeting.createdBy?.id || isAdminUser}
                <div class="flex gap-4">
                    <Button
                        color="blue"
                        size="sm"
                        onclick={() => (inEditMode = !inEditMode)}
                    >
                        <EditOutline class="mr-2 h-4 w-4" />Edit
                    </Button>
                    <Button color="red" size="sm" onclick={handleDeleteMeeting}>
                        <TrashBinOutline class="mr-2 h-4 w-4" />Delete
                    </Button>
                </div>
            {/if}
        </div>

        <div class="space-y-4">
            {#if inEditMode}
                <Label for="description">Description</Label>
                <Input type="text" bind:value={description} class="w-full" />
            {:else if meeting.description}
                <div class="bg-gray-50 p-4 rounded-lg">
                    <P class="whitespace-pre-line">{meeting.description}</P>
                </div>
            {/if}

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#if inEditMode}
                    <div>
                        <Label for="start_time">Start time</Label>
                        <Input
                            id="start_time"
                            type="datetime-local"
                            bind:value={startTime}
                            required
                        />
                    </div>
                {:else}
                    <div class="flex items-center">
                        <CalendarMonthOutline
                            class="mr-2 h-5 w-5 text-blue-600"
                        />
                        <div>
                            <P class="text-sm font-semibold text-gray-600"
                                >Start Time</P
                            >
                            <P>{formatDate(meeting.startTime)}</P>
                        </div>
                    </div>
                {/if}

                {#if inEditMode}
                    <div>
                        <Label for="end_time">End time</Label>
                        <Input
                            id="end_time"
                            type="datetime-local"
                            bind:value={endTime}
                            required
                        />
                    </div>
                {:else}
                    <div class="flex items-center">
                        <ClockOutline class="mr-2 h-5 w-5 text-blue-600" />
                        <div>
                            <P class="text-sm font-semibold text-gray-600"
                                >End Time</P
                            >
                            <P>{formatDate(meeting.endTime)}</P>
                        </div>
                    </div>
                {/if}

                {#if meeting.createdBy && !inEditMode}
                    <div class="flex items-center">
                        <UserOutline class="mr-2 h-5 w-5 text-blue-600" />
                        <div>
                            <P class="text-sm font-semibold text-gray-600"
                                >Organizer</P
                            >
                            <P>{meeting.createdBy?.username || "Unknown"}</P>
                        </div>
                    </div>
                {/if}
                <div>
                    {#if inEditMode}
                        <div>
                            <Label for="room" class="mb-2">Room Selection</Label
                            >
                            <Search
                                bind:value={roomSearchQuery}
                                placeholder="Search rooms..."
                                class="mb-3"
                            />

                            <!-- Filter section with toggle button -->
                            <div class="flex items-center justify-between mb-2">
                                <button
                                    type="button"
                                    class="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
                                    onclick={toggleFilters}
                                >
                                    <span class="mr-1">Filters</span>
                                    <ChevronDownOutline
                                        class={`w-4 h-4 ${filtersVisible ? "rotate-180" : ""}`}
                                    />
                                </button>
                                <div class="text-xs text-gray-500">
                                    {minimumCapacity > 1
                                        ? `Min capacity: ${minimumCapacity}`
                                        : ""}
                                    {activeOnly ? " • Active only" : ""}
                                    {roomAddress ? ` • ${roomAddress}` : ""}
                                </div>
                            </div>

                            <!-- Collapsible filter section -->
                            {#if filtersVisible}
                                <div
                                    class="bg-gray-50 p-4 rounded-lg mb-4 shadow-sm transition-all duration-300 ease-in-out"
                                >
                                    <div
                                        class="grid grid-cols-1 md:grid-cols-3 gap-4"
                                    >
                                        <div>
                                            <Label
                                                for="min_capacity"
                                                class="text-sm"
                                                >Minimum capacity</Label
                                            >
                                            <Input
                                                type="number"
                                                id="min_capacity"
                                                min="1"
                                                bind:value={minimumCapacity}
                                            />
                                        </div>
                                        <div>
                                            <Label for="address" class="text-sm"
                                                >Address</Label
                                            >
                                            <Search
                                                id="address"
                                                bind:value={roomAddress}
                                                placeholder="Filter by address"
                                            />
                                        </div>
                                        <div class="flex items-center">
                                            <Checkbox
                                                id="active_only"
                                                bind:checked={activeOnly}
                                                class="mr-2"
                                            />
                                            <Label
                                                for="active_only"
                                                class="text-sm"
                                                >Active rooms only</Label
                                            >
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </div>

                        <hr class="mb-3" />
                        {#if roomPageDto && roomPageDto.page && roomPageDto.page.length > 0}
                            <div
                                class="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto"
                            >
                                {#each roomPageDto?.page as room}
                                    {#if room.id != undefined}
                                        <Button
                                            color={roomDto?.id === room.id
                                                ? "blue"
                                                : "light"}
                                            class="w-full h-full text-left p-2"
                                            size="sm"
                                            on:click={() => (roomDto = room)}
                                        >
                                            <div class="flex flex-col">
                                                <span class="font-medium"
                                                    >{room.name}</span
                                                >
                                                {#if room.capacity}
                                                    <span
                                                        class="text-xs text-gray-500"
                                                        >Capacity: {room.capacity}</span
                                                    >
                                                {/if}
                                            </div>
                                        </Button>
                                    {/if}
                                {/each}
                            </div>
                        {:else}
                            <P>No rooms found</P>
                        {/if}
                    {:else if meeting.room}
                        <div class="flex items-center">
                            <MapPinOutline class="mr-2 h-5 w-5 text-blue-600" />
                            <div>
                                <P class="text-sm font-semibold text-gray-600"
                                    >Location</P
                                >
                                <P
                                    >{meeting.room.name ||
                                        "Room " + meeting.room.id}</P
                                >
                            </div>
                        </div>
                    {/if}
                </div>
            </div>

            {#if inEditMode}
                <Label for="participants" class="mb-2">Participants</Label>
                <Search
                    bind:value={userSearchQuery}
                    placeholder="Search users..."
                    class="mb-3"
                />
                <!-- Selected participants badges -->
                {#if meetingParticipants.length > 0}
                    <div
                        class="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg"
                    >
                        {#each meetingParticipants as participant}
                            <div
                                class="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1"
                            >
                                <span class="mr-1 text-sm"
                                    >{participant.user?.username ||
                                        participant.user?.username ||
                                        `User ${participant.id}`}</span
                                >
                                <button
                                    type="button"
                                    class="text-blue-600 hover:text-blue-800"
                                    onclick={() => {
                                        meetingParticipants =
                                            meetingParticipants.filter(
                                                (p) => p.id !== participant.id,
                                            );
                                    }}
                                >
                                    &times;
                                </button>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <P class="text-sm text-gray-500 italic mb-3"
                        >No participants selected</P
                    >
                {/if}

                {#if userPageDto && userPageDto.page && userPageDto.page.length > 0}
                    <div
                        class="max-h-40 overflow-y-auto border border-gray-200 rounded-lg"
                    >
                        {#each userPageDto.page as user}
                            <!-- Only show users who aren't already participants -->
                            {#if !meetingParticipants.some((p) => p.id === user.id)}
                                <button
                                    type="button"
                                    class="flex items-center w-full text-left p-2 hover:bg-gray-50 border-b border-gray-200 last:border-b-0"
                                    onclick={() => {
                                        meetingParticipants = [
                                            ...meetingParticipants,
                                            user,
                                        ];
                                        userSearchQuery = ""; // Clear search after selection
                                    }}
                                >
                                    <div class="flex flex-col">
                                        <span class="font-medium">
                                            {user.username ||
                                                user.email ||
                                                `User ${user.id}`}
                                        </span>
                                        {#if user.email && user.email !== user.username}
                                            <span class="text-xs text-gray-500"
                                                >{user.email}</span
                                            >
                                        {/if}
                                    </div>
                                </button>
                            {/if}
                        {/each}
                    </div>
                {:else if userSearchQuery.trim() !== ""}
                    <P class="text-sm text-gray-500">No matching users found</P>
                {/if}
            {:else if meeting.participants && meeting.participants.length > 0}
                <div class="mt-6">
                    <Heading tag="h5" class="mb-2 text-lg">Participants</Heading
                    >
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <ul class="list-disc pl-5">
                            {#each meeting.participants as participant}
                                <li>
                                    {participant.user?.username ||
                                        "Unknown user"}
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/if}
        </div>
        {#if inEditMode}
            <div class="mt-6">
                <Button
                    color="blue"
                    class="w-full"
                    size="lg"
                    onclick={handleEditMeeting}>Save</Button
                >
            </div>
        {/if}
    {:else}
        <div class="text-center py-8">
            <P class="text-lg text-gray-600">Unable to load meeting details</P>
        </div>
    {/if}
</Modal>
