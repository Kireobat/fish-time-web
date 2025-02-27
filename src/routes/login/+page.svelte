<script lang="ts">
    import { envVariables } from "$lib/util/envVariables";
    import {
        A,
        Button,
        Card,
        Checkbox,
        Heading,
        Input,
        Label,
        P,
        TabItem,
        Tabs,
    } from "flowbite-svelte";
    import {
        AppleSolid,
        GithubSolid,
        GoogleSolid,
    } from "flowbite-svelte-icons";
    import { onMount } from "svelte";

    let email: string = $state("");
    let username: string = $state("");
    let password: string = $state("");
    let confirmPassword: string = $state("");
    let passwordMatch: boolean = $derived(password === confirmPassword);

    let oAuthProvider: { href: string; name: string }[] = $state([]);

    const generateState = () => {
        const state = {
            redirectUri:
                new URLSearchParams(window.location.search).get("ref") ||
                window.location.origin + "/dashboard",
            nonce: crypto.randomUUID(),
        };
        return btoa(JSON.stringify(state))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    };

    onMount(() => {
        oAuthProvider = [
            {
                href: `${envVariables.backendUrl()}/oauth2/authorization/github?preferredRedirect=${generateState()}`,
                name: "github",
            },
            {
                href: `${envVariables.backendUrl()}/oauth2/authorization/google?preferredRedirect=${generateState()}`,
                name: "google",
            },
            {
                href: `${envVariables.backendUrl()}/oauth2/authorization/apple?preferredRedirect=${generateState()}`,
                name: "apple",
            },
        ];
    });
</script>

<div class="flex justify-center w-full">
    <Card class="flex flex-col gap-4">
        <div>
            <Heading
                tag="h1"
                class="mb-4"
                customSize="text-3xl font-bold  md:text-4xl lg:text-5xl"
                >Login or Register</Heading
            >
        </div>
        <div>
            <P class="mb-4">Use an OAuth provider</P>
            <div class="flex justify-between w-full px-4">
                {#each oAuthProvider as provider}
                    <Button color="light" href={provider.href}>
                        {#if provider.name == "github"}
                            <GithubSolid size="xl" />
                        {:else if provider.name == "google"}
                            <GoogleSolid size="xl" />
                        {:else if provider.name == "apple"}
                            <AppleSolid size="xl" />
                        {/if}
                    </Button>
                {/each}
            </div>
        </div>
        <P class="mb-4 w-full text-center">or</P>
        <div>
            <Tabs>
                <TabItem open title="Register">
                    <form>
                        <div class="flex flex-col">
                            <div>
                                <Label for="email">Email</Label>
                                <Input
                                    type="text"
                                    id="email"
                                    placeholder="example@kireobat.eu"
                                    bind:value={email}
                                />
                            </div>
                            <div>
                                <Label for="username">Username</Label>
                                <Input
                                    type="text"
                                    id="username"
                                    placeholder="username"
                                    bind:value={username}
                                />
                            </div>
                            <div>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="********"
                                    bind:value={password}
                                    color={passwordMatch ? "base" : "red"}
                                />
                            </div>
                            <div>
                                <Label for="confirm_password"
                                    >Confirm Password</Label
                                >
                                <Input
                                    type="password"
                                    id="confirm_password"
                                    placeholder="********"
                                    bind:value={confirmPassword}
                                    color={passwordMatch ? "base" : "red"}
                                />
                            </div>
                        </div>
                        <Checkbox
                            class="mb-6 space-x-1 rtl:space-x-reverse"
                            required
                        >
                            <P>I agree with the</P>
                            <A href="/legal/terms-and-conditions">
                                <P
                                    class="text-primary-700 dark:text-primary-600 hover:underline"
                                    >terms and conditions</P
                                >
                            </A>
                            <P>.</P>
                        </Checkbox>
                        <Checkbox
                            class="mb-6 space-x-1 rtl:space-x-reverse"
                            required
                        >
                            <P>I agree with the</P>
                            <A href="/legal/privacy-policy">
                                <P
                                    class="text-primary-700 dark:text-primary-600 hover:underline"
                                    >privacy policy</P
                                >
                            </A>
                            <P>.</P>
                        </Checkbox>
                        <Button type="submit">Submit</Button>
                    </form>
                </TabItem>
                <TabItem title="Log in">
                    <form>
                        <div class="flex flex-col">
                            <div>
                                <Label for="email">Email</Label>
                                <Input
                                    type="text"
                                    id="email"
                                    placeholder="example@twojaws.com"
                                />
                            </div>
                            <div>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="********"
                                />
                            </div>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </TabItem>
            </Tabs>
        </div>
    </Card>
</div>
