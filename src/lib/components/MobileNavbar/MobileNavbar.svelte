<script lang="ts">
    import { Avatar } from "flowbite-svelte";
    import {
        CalendarMonthOutline,
        SearchOutline,
        CirclePlusOutline,
        BellOutline,
    } from "flowbite-svelte-icons";
    import CreateMeetingModal from "../CreateMeetingModal/CreateMeetingModal.svelte";

    let createMeetingModalIsOpen: boolean = $state(false);
</script>

<div class="w-full flex justify-evenly">
    <a href="/">
        <CalendarMonthOutline size="xl" />
    </a>
    <a href="/search">
        <SearchOutline size="xl" />
    </a>
    <CreateMeetingModal bind:open={createMeetingModalIsOpen}>
        <button onclick={() => (createMeetingModalIsOpen = true)}>
            <CirclePlusOutline size="xl" /></button
        >
    </CreateMeetingModal>
    <a href="/notifications">
        <BellOutline size="xl" />
    </a>
    <a href="/profile">
        <Avatar size="sm" />
    </a>
</div>
