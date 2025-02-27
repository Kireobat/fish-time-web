<script lang="ts">
    import {
        DarkMode,
        Dropdown,
        DropdownDivider,
        DropdownHeader,
        DropdownItem,
    } from "flowbite-svelte";
    import { CogOutline } from "flowbite-svelte-icons";
</script>

<div class="w-full flex justify-end px-5">
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
