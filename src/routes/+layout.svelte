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
    class="dark:bg-background-950 bg-background-50 font-family-body font-normal"
>
    <div class="hidden sm:block mx-8">
        <Navbar color="none">
            <NavBrand href="/">
                <img
                    src="/logo.svg"
                    alt="Flowbite logo"
                    class="w-16 h-16 mr-2"
                />
                <P class="self-center whitespace-nowrap text-xl font-semibold "
                    >Fishtime</P
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
                        <DropdownItem href="/admin">Admin</DropdownItem>
                        <DropdownItem href="/profile">Profile</DropdownItem>
                        <DropdownItem href="/logout">Log out</DropdownItem>
                    {:else}
                        <DropdownItem href="/login"
                            >Log in or register
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

    <div class="block sm:hidden py-3 bottom-0 fixed left-0 right-0">
        <MobileNavbar />
    </div>
</div>

<Feedback />
