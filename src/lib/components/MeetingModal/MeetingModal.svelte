<script lang="ts">
    import { getUsers } from "$lib/functions/get/getUsers";
    import { user } from "$lib/functions/user.svelte";
    import type { MeetingDto } from "$lib/generated/fish-time";
    import { Heading, Modal, P, Button } from "flowbite-svelte";
    import {
        CalendarMonthOutline,
        ClockOutline,
        UserOutline,
        MapPinOutline,
        EditOutline,
    } from "flowbite-svelte-icons";

    interface MeetingModalProps {
        meeting: MeetingDto | undefined;
        open: boolean;
    }

    let { meeting, open = $bindable(false) }: MeetingModalProps = $props();

    // Handle edit button click
    function handleEdit() {
        // You can implement edit functionality here or emit an event
        console.log("Edit meeting:", meeting?.id);
    }

    // Format date for display
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

<Modal bind:open autoclose outsideclose class="w-full max-w-2xl">
    {#if meeting}
        <div class="flex justify-between items-center mb-6 mr-8">
            <Heading tag="h3" class="text-xl font-bold">{meeting.title}</Heading
            >
            {#if user.current?.id === meeting.createdBy?.id}
                <Button color="blue" size="sm" on:click={handleEdit}>
                    <EditOutline class="mr-2 h-4 w-4" />Edit
                </Button>
            {/if}
        </div>

        <div class="space-y-4">
            {#if meeting.description}
                <div class="bg-gray-50 p-4 rounded-lg">
                    <P class="whitespace-pre-line">{meeting.description}</P>
                </div>
            {/if}

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center">
                    <CalendarMonthOutline class="mr-2 h-5 w-5 text-blue-600" />
                    <div>
                        <P class="text-sm font-semibold text-gray-600"
                            >Start Time</P
                        >
                        <P>{formatDate(meeting.startTime)}</P>
                    </div>
                </div>

                <div class="flex items-center">
                    <ClockOutline class="mr-2 h-5 w-5 text-blue-600" />
                    <div>
                        <P class="text-sm font-semibold text-gray-600"
                            >End Time</P
                        >
                        <P>{formatDate(meeting.endTime)}</P>
                    </div>
                </div>

                {#if meeting.createdBy}
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

                {#if meeting.room}
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

            {#if meeting.participants && meeting.participants.length > 0}
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
    {:else}
        <div class="text-center py-8">
            <P class="text-lg text-gray-600">Unable to load meeting details</P>
        </div>
    {/if}
</Modal>
