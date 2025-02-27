<script lang="ts">
    import { Avatar } from "flowbite-svelte";
    import {
        CalendarMonthOutline,
        SearchOutline,
        CirclePlusOutline,
        BellOutline,
    } from "flowbite-svelte-icons";
</script>

<div class="w-full flex justify-evenly">
    <a href="/">
        <CalendarMonthOutline size="xl" />
    </a>
    <a href="/search">
        <SearchOutline size="xl" />
    </a>
    <a href="/create">
        <CirclePlusOutline size="xl" />
    </a>
    <a href="/notifications">
        <BellOutline size="xl" />
    </a>
    <a href="/profile">
        <Avatar size="sm" />
    </a>
</div>
