<script lang="ts">
    import Calendar from "@event-calendar/core";
    import TimeGrid from "@event-calendar/time-grid";
    import DayGrid from "@event-calendar/day-grid";
    import List from "@event-calendar/list";
    import Interaction from "@event-calendar/interaction";
    import type { CalendarOptions } from "$lib/types/EventCalendar";

    let plugins = [TimeGrid, DayGrid, List, Interaction];
    let options: CalendarOptions = {
        view: "listDay",
        events: [
            {
                title: "Meeting",
                start: "2025-02-27T10:00:00",
                end: "2025-02-27T12:00:00",
            },
        ],
    };
</script>

<div class="p-8">
    <Calendar {plugins} {options} />
</div>
