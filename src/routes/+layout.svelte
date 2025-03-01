<script lang="ts">
    import {
        Navbar,
        NavBrand,
        NavHamburger,
        NavUl,
        NavLi,
        DarkMode,
        Avatar,
        Dropdown,
        DropdownDivider,
        DropdownHeader,
        DropdownItem,
        P,
        Search,
    } from "flowbite-svelte";
    import "../app.css";
    import MobileNavbar from "$lib/components/MobileNavbar/MobileNavbar.svelte";
    import MobileTopbar from "$lib/components/MobileTopbar/MobileTopbar.svelte";
    import { user } from "$lib/functions/user.svelte";
    import { getProfile } from "$lib/functions/get/getProfile";
    import { onMount } from "svelte";
    import Feedback from "$lib/components/Feedback/Feedback.svelte";
    let { children } = $props();

    const getUser = async () => {
        user.current = await getProfile();
    };

    onMount(() => {
        getUser();
    });
</script>

<div
    class="bg-background-950 dark:bg-background-50 text-text-50 dark:text-text-950 font-family-body font-normal"
>
    <div class="hidden sm:block mx-8">
        <Navbar color="none">
            <NavBrand href="/">
                <img
                    src="/logo.svg"
                    alt="Flowbite logo"
                    class="w-16 h-16 mr-2"
                />
                <span
                    class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
                    >Fishtime</span
                >
            </NavBrand>
            <NavHamburger />
            <NavUl>
                <NavLi>
                    <Search />
                </NavLi>
                <NavLi>
                    <DarkMode size="lg" />
                </NavLi>
                <button id="avatar-menu">
                    <Avatar src="" alt="User avatar" class="w-8 h-8" />
                </button>
                <Dropdown placement="bottom" triggeredBy="#avatar-menu">
                    <DropdownHeader>
                        {#if user.current}
                            <span class="block text-sm"
                                >{user.current?.username}</span
                            >
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
            </NavUl>
        </Navbar>
    </div>
    <div class="block sm:hidden py-3">
        <MobileTopbar />
    </div>

    {@render children()}

    <div
        class="block sm:hidden py-3 bottom-0 fixed left-0 right-0 bg-background-950 dark:bg-background-50"
    >
        <MobileNavbar />
    </div>
</div>

<Feedback />
