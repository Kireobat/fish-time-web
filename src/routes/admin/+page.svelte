<script lang="ts">
    import {
        Button,
        Label,
        Input,
        Textarea,
        Select,
        Spinner,
        Checkbox,
        Avatar,
        P,
    } from "flowbite-svelte";
    import { roomApi, userApi } from "$lib/api/apiClient";
    import type {
        CreateRoomDto,
        CreateUserDto,
    } from "$lib/generated/fish-time";
    import { createUsers } from "$lib/functions/create/createUsers";
    import { createRoom } from "$lib/functions/create/createRoom";

    let isSubmitting = $state(false);
    let name = $state("");
    let capacity = $state(0);
    let address = $state("");
    let active = $state(false);

    let createUserDtoList: CreateUserDto[] = $state([]);
    let username = $state("");
    let email = $state("");
    let password = $state("");

    const handleCreateRoom = async () => {
        isSubmitting = true;

        const createRoomDto: CreateRoomDto = {
            name: name,
            capacity: capacity,
            address: address,
            active: active,
        };

        await createRoom(createRoomDto);
        isSubmitting = false;
    };

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

<div
    class="p-6 max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md"
>
    <h2 class="text-2xl font-bold mb-6">Create New Room</h2>

    <form class="space-y-4">
        <div>
            <Label for="name">Room Name</Label>
            <Input
                id="name"
                placeholder="Enter room name"
                bind:value={name}
                required
            />
        </div>

        <div>
            <Label for="address">Address</Label>
            <Input
                type="text"
                id="address"
                placeholder="Room address"
                bind:value={address}
            />
        </div>

        <div>
            <Label for="capacity">Capacity</Label>
            <Input
                id="capacity"
                type="number"
                min="1"
                bind:value={capacity}
                required
            />
        </div>

        <div class="flex items-center mb-4">
            <Checkbox
                id="active"
                type="checkbox"
                bind:checked={active}
                class="w-4 h-4 text-blue-600"
            />
            <Label for="active" class="ml-2">Active</Label>
        </div>

        <Button
            type="submit"
            disabled={isSubmitting}
            onclick={handleCreateRoom}
            class="w-full"
        >
            {#if isSubmitting}
                Creating...
            {:else}
                Create Room
            {/if}
        </Button>
    </form>
</div>
<div
    class="p-6 max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md"
>
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
</div>
