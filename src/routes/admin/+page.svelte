<script lang="ts">
    import { Button, P, Heading, Card } from "flowbite-svelte";
    import type {
        FishTimePageDtoMeetingDto,
        FishTimePageDtoRoomDto,
        FishTimePageDtoUserDto,
    } from "$lib/generated/fish-time";
    import { onMount } from "svelte";
    import { getRooms } from "$lib/functions/get/getRooms";
    import { getUsers } from "$lib/functions/get/getUsers";
    import { getMeetings } from "$lib/functions/get/getMeetings";

    let roomPageDto: FishTimePageDtoRoomDto | undefined = $state();
    let userPageDto: FishTimePageDtoUserDto | undefined = $state();
    let meetingPageDto: FishTimePageDtoMeetingDto | undefined = $state();

    onMount(async () => {
        roomPageDto = await getRooms(0, 0, ["id,ASC"]);
        userPageDto = await getUsers(0, 0, ["id,ASC"]);
        meetingPageDto = await getMeetings(0, 0, ["id,ASC"]);
    });
</script>

<div class="mb-6 mx-10">
    <Heading class="mb-6 w-full text-center">App Stats</Heading>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card size="lg">
            <P class="text-sm text-gray-500">Total Rooms</P>
            <P class="text-2xl font-bold">{roomPageDto?.totalItems}</P>
        </Card>
        <Card size="lg">
            <P class="text-sm text-gray-500">Total Users</P>
            <P class="text-2xl font-bold">{userPageDto?.totalItems}</P>
        </Card>
        <Card size="lg">
            <P class="text-sm text-gray-500">Total Meetings</P>
            <P class="text-2xl font-bold">{meetingPageDto?.totalItems}</P>
        </Card>
    </div>
</div>

<div class="mb-6 mx-10">
    <Heading class="mb-6 w-full text-center">Management</Heading>
    <div class="flex justify-center gap-4">
        <Button href="/admin/rooms">Manage Rooms</Button>
        <Button href="/admin/users">Manage Users</Button>
    </div>
</div>
