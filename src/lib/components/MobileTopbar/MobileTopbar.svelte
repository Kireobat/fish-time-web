<script lang="ts">
    import { user } from "$lib/functions/user.svelte";
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
            {#if user.current}
                <span class="block text-sm">{user.current?.username}</span>
                <span class="block truncate text-sm font-medium"
                    >{user.current?.email}</span
                >
            {:else}
                <span class="block text-sm">Not logged in</span>
            {/if}
        </DropdownHeader>
        <DropdownItem href="/legal">Legal</DropdownItem>

        {#if user.current}
            <DropdownItem>
                <a href="/admin">Admin</a>
            </DropdownItem>
            <DropdownItem>
                <a href="/profile">Profile</a>
            </DropdownItem>
            <DropdownItem>
                <a href="/logout">Log out</a>
            </DropdownItem>
        {:else}
            <DropdownItem>
                <a href="/login">Log in or register</a>
            </DropdownItem>
        {/if}
    </Dropdown>
</div>
