<script lang="ts">
    import Calendar from "@event-calendar/core";
    import TimeGrid from "@event-calendar/time-grid";
    import DayGrid from "@event-calendar/day-grid";
    import List from "@event-calendar/list";
    import Interaction from "@event-calendar/interaction";
    import type { CalendarOptions, EventInput } from "$lib/types/EventCalendar";
    import CreateMeetingModal from "$lib/components/CreateMeetingModal/CreateMeetingModal.svelte";
    import type {
        FishTimePageDtoMeetingDto,
        MeetingDto,
    } from "$lib/generated/fish-time";
    import { getMeetings } from "$lib/functions/get/getMeetings";
    import MeetingModal from "$lib/components/MeetingModal/MeetingModal.svelte";

    let meetingModalIsOpen: boolean = $state(false);
    let selectedMeetingId: number = $state(0);
    let selectedMeeting: MeetingDto | undefined = $state();

    $effect(() => {
        if (selectedMeetingId && meetingPageDto?.page) {
            selectedMeeting = meetingPageDto?.page.find(
                (meeting) => meeting.id === selectedMeetingId,
            );
        }
    });

    let currentCalendarDate = $state(new Date());
    let currentCalendarEndDate = $state(new Date());

    let startDate = $derived(() => {
        // Create a new date to avoid modifying currentCalendarDate
        const startDateUTC = new Date(
            new Date(currentCalendarDate).setDate(
                currentCalendarDate.getDate() + 1,
            ),
        );
        // Set to beginning of day in UTC
        startDateUTC.setUTCHours(0, 0, 0, 0);
        return startDateUTC;
    });

    let endDate = $derived(() => {
        // Create a new date to avoid modifying currentCalendarDate
        const endDateUTC = new Date(new Date(currentCalendarEndDate));
        // Set to end of day in UTC
        endDateUTC.setUTCHours(23, 59, 59, 999);
        return endDateUTC;
    });

    let meetingPageDto: FishTimePageDtoMeetingDto | undefined = $state();

    let events: EventInput[] = $state([]);

    let plugins = [TimeGrid, DayGrid, List, Interaction];
    let options = $derived<CalendarOptions>({
        dateClick: (info) => {
            console.log(info);
        },
        view: "listDay",
        headerToolbar: {
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay,listDay",
        },
        datesSet: (info) => {
            // This callback is triggered whenever the date range displayed changes
            currentCalendarDate = info.start;
            currentCalendarEndDate = info.end;
        },
        eventClick: (info) => {
            selectedMeetingId = Number(info.event.id);
            meetingModalIsOpen = true;
        },
        events: events,
    });

    $effect(() => {
        const fetchMeetings = async () => {
            meetingPageDto = await getMeetings(
                0,
                1000,
                ["id,ASC"],
                undefined,
                undefined,
                startDate(),
                endDate(),
            );
        };
        fetchMeetings();
    });

    $effect(() => {
        if (meetingPageDto && meetingPageDto.page) {
            events = meetingPageDto.page.map((meeting) => {
                return {
                    id: meeting.id,
                    title: meeting.title ?? "Untitled Meeting",
                    start: meeting.startTime ?? new Date(),
                    end: meeting.endTime ?? new Date(),
                };
            });
        }
    });
</script>

<MeetingModal bind:open={meetingModalIsOpen} meeting={selectedMeeting} />
<div class="p-8">
    <div class="flex gap-8 mb-8">
        <CreateMeetingModal />
    </div>
    <Calendar {plugins} {options} />
</div>
