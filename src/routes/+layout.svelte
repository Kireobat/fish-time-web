<script lang="ts">
    import {
        Navbar,
        NavBrand,
        NavHamburger,
        NavUl,
        NavLi,
        DarkMode,
    } from "flowbite-svelte";
    import "../app.css";
    import MobileNavbar from "$lib/components/MobileNavbar/MobileNavbar.svelte";
    import MobileTopbar from "$lib/components/MobileTopbar/MobileTopbar.svelte";
    let { children } = $props();
</script>

<div
    class="bg-background-950 dark:bg-background-50 text-text-50 dark:text-text-950 font-family-body font-normal"
>
    <div class="hidden sm:block">
        <Navbar color="none">
            <NavBrand href="/">
                <span
                    class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
                    >Flowbite</span
                >
            </NavBrand>
            <NavHamburger />
            <NavUl>
                <NavLi href="/">Home</NavLi>
                <NavLi href="/about">About</NavLi>
                <NavLi href="/docs/components/navbar">Navbar</NavLi>
                <NavLi href="/pricing">Pricing</NavLi>
                <NavLi href="/contact">Contact</NavLi>
                <NavLi><DarkMode /></NavLi>
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
