<script lang="ts">
    import { createUsers } from "$lib/functions/create/createUsers";
    import type { CreateUserDto } from "$lib/generated/fish-time";
    import { Button, Input, Label, Modal, P, Search } from "flowbite-svelte";
    import { type Snippet } from "svelte";

    interface CreateMeetingModalProps {
        children: Snippet<[]>;
        open: boolean;
    }

    let { children, open = $bindable(false) }: CreateMeetingModalProps =
        $props();

    let createUserDtoList: CreateUserDto[] = $state([]);
    let username = $state("");
    let email = $state("");
    let password = $state("");
    let isSubmitting = $state(false);

    const handleUserCreate = async () => {
        isSubmitting = true;

        await createUsers(createUserDtoList);
        isSubmitting = false;
    };
    const addCreateUserDto = () => {
        createUserDtoList = [
            ...createUserDtoList,
            {
                username: username,
                email: email,
                password: password,
            },
        ];
    };
</script>

{@render children()}

<Modal bind:open outsideclose>
    <h2 class="text-2xl font-bold mb-6">Create users</h2>

    <form class="space-y-4">
        <div>
            <Label for="username">Username</Label>
            <Input
                id="username"
                placeholder="Enter username"
                bind:value={username}
                required
            />
        </div>

        <div>
            <Label for="email">Email</Label>
            <Input
                type="text"
                id="email"
                placeholder="Enter email"
                bind:value={email}
            />
        </div>

        <div>
            <Label for="password">Password</Label>
            <Input
                id="password"
                type="password"
                bind:value={password}
                required
            />
        </div>

        <Button
            type="submit"
            disabled={isSubmitting}
            onclick={addCreateUserDto}
            class="w-full"
        >
            Add user to list
        </Button>

        <div>
            <h2 class="text-2xl font-bold mb-6">Users list</h2>

            {#if createUserDtoList.length > 0}
                <div
                    class="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg"
                >
                    {#each createUserDtoList as createUserDto}
                        <div
                            class="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1"
                        >
                            <span class="mr-1 text-sm"
                                >{createUserDto.username ||
                                    createUserDto.email ||
                                    `User ${createUserDto.username}`}</span
                            >
                            <button
                                type="button"
                                class="text-blue-600 hover:text-blue-800"
                                onclick={() => {
                                    createUserDtoList =
                                        createUserDtoList.filter(
                                            (p) =>
                                                p.username !==
                                                createUserDto.username,
                                        );
                                }}
                            >
                                &times;
                            </button>
                        </div>
                    {/each}
                </div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    onclick={handleUserCreate}
                    class="w-full"
                >
                    {#if isSubmitting}
                        Creating...
                    {:else}
                        Create Users
                    {/if}
                </Button>
            {:else}
                <P class="text-sm text-gray-500 italic mb-3"
                    >No users to create</P
                >
            {/if}
        </div>
    </form>
</Modal>
