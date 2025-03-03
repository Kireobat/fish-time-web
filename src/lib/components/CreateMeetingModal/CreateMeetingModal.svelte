<script lang="ts">
    import { createMeeting } from "$lib/functions/create/createMeeting";
    import { createParticipant } from "$lib/functions/create/createParticipant";
    import { getRooms } from "$lib/functions/get/getRooms";
    import { getUsers } from "$lib/functions/get/getUsers";
    import type {
        CreateMeetingDto,
        FishTimePageDtoRoomDto,
        FishTimePageDtoUserDto,
        MeetingDto,
        RoomDto,
        UserDto,
    } from "$lib/generated/fish-time";
    import {
        Button,
        Checkbox,
        Heading,
        Input,
        Label,
        Modal,
        P,
        Search,
    } from "flowbite-svelte";
    import { ChevronDownOutline } from "flowbite-svelte-icons";
    import { onMount, type Snippet } from "svelte";

    interface CreateMeetingModalProps {
        children: Snippet<[]>;
        open: boolean;
        startDate?: Date;
        endDate?: Date;
    }

    let {
        children,
        open = $bindable(false),
        startDate,
        endDate,
    }: CreateMeetingModalProps = $props();

    let filtersVisible = $state(false);

    let roomPageDto: FishTimePageDtoRoomDto | undefined = $state();
    let roomSearchQuery = $state("");
    let minimumCapacity = $state(1);
    let activeOnly = $state(true);
    let roomAddress = $state("");

    let meetingTitle = $state("");
    let meetingDescription = $state("");
    let meetingStartTime: Date | undefined = $state();
    let meetingEndTime: Date | undefined = $state();
    let roomDto: RoomDto | undefined = $state();
    let meetingParticipants: UserDto[] = $state([]);

    let userPageDto: FishTimePageDtoUserDto | undefined = $state();
    let userSearchQuery = $state("");

    onMount(async () => {
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
        userPageDto = await getUsers(
            0,
            10,
            ["id,ASC"],
            undefined,
            userSearchQuery,
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
        meetingStartTime = startDate;
        meetingEndTime = endDate;
    });

    $effect(() => {
        roomSearchQuery = roomDto?.name ?? "";
    });

    const handleCreateMeeting = async () => {
        const createMeetingDto: CreateMeetingDto = {
            title: meetingTitle,
            description: meetingDescription,
            startTime: meetingStartTime
                ? new Date(meetingStartTime)
                : undefined,
            endTime: meetingEndTime ? new Date(meetingEndTime) : undefined,
            roomId: roomDto?.id,
        };

        const meetingDto = await createMeeting(createMeetingDto);

        if (meetingDto) {
            await addParticipants(meetingParticipants, meetingDto);
        }
    };

    const addParticipants = async (
        participants: UserDto[],
        meeting: MeetingDto,
    ) => {
        for (const participant of participants) {
            await createParticipant({
                meetingId: meeting.id,
                userId: participant.id,
                status: "PENDING",
            });
        }
    };

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
</script>

{@render children()}

<Modal bind:open outsideclose>
    <form>
        <Heading tag="h4" class="mb-8">Create a new meeting</Heading>
        <div class="flex flex-col gap-4">
            <div>
                <Label for="title">Title</Label>
                <Input
                    type="text"
                    id="title"
                    required
                    bind:value={meetingTitle}
                />
            </div>
            <div>
                <Label for="description">Description</Label>
                <Input
                    type="text"
                    id="description"
                    bind:value={meetingDescription}
                />
            </div>
            <div class="flex space-x-4 justify-between">
                <div class="w-full">
                    <Label for="start_time">Start time</Label>
                    <Input
                        type="datetime-local"
                        id="start_time"
                        required
                        bind:value={meetingStartTime}
                    />
                    <P>{formatDate(meetingStartTime)}</P>
                </div>
                <div class="w-full">
                    <Label for="end_time">End time</Label>
                    <Input
                        type="datetime-local"
                        id="end_time"
                        required
                        bind:value={meetingEndTime}
                    />
                    <P>{formatDate(meetingEndTime)}</P>
                </div>
            </div>
            <div>
                <Label for="room" class="mb-2">Room Selection</Label>
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
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label for="min_capacity" class="text-sm"
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
                                <Label for="active_only" class="text-sm"
                                    >Active rooms only</Label
                                >
                            </div>
                        </div>
                    </div>
                {/if}
            </div>

            <hr class="mb-3" />
            {#if roomPageDto && roomPageDto.page && roomPageDto.page.length > 0}
                <div class="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
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
                                    <span class="font-medium">{room.name}</span>
                                    {#if room.capacity}
                                        <span class="text-xs text-gray-500"
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
        </div>
        <div class="mt-4">
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
                                >{participant.username ||
                                    participant.email ||
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

            <!-- User search results -->
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
        </div>
        <div class="mt-4 flex justify-end">
            <Button type="submit" onclick={handleCreateMeeting}
                >Create Meeting</Button
            >
        </div>
    </form>
</Modal>
