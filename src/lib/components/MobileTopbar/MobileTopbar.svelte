<script lang="ts">
    import {
        DarkMode,
        Dropdown,
        DropdownDivider,
        DropdownHeader,
        DropdownItem,
        P,
    } from "flowbite-svelte";
    import { CogOutline } from "flowbite-svelte-icons";
</script>

<div class="w-full flex justify-between px-5">
    <a href="/" class="flex items-center">
        <img src="/logo.svg" alt="Flowbite logo" class="w-8 h-8 mr-2" />
        <P>FishTime</P>
    </a>
    <button id="settings-menu">
        <CogOutline size="xl" />
    </button>
    <Dropdown placement="bottom" triggeredBy="#settings-menu">
        <DropdownHeader>
            <span class="block text-sm">Bonnie Green</span>
            <span class="block truncate text-sm font-medium"
                >name@flowbite.com</span
            >
        </DropdownHeader>
        <DropdownItem>Dashboard</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Earnings</DropdownItem>
        <DropdownItem>
            <DarkMode />
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem>Sign out</DropdownItem>
    </Dropdown>
</div>
