<script lang="ts">
    import { Modal, Label, Input, Button, Tooltip } from "flowbite-svelte";
    import { user } from "$lib/functions/user.svelte";
    import type { Snippet } from "svelte";
    import type { UpdateUserDto } from "$lib/generated/fish-time";
    import { patchUser } from "$lib/functions/patch/patchUser";

    interface EditProfileModalProps {
        children: Snippet<[]>;
        open: boolean;
    }

    let { children, open = $bindable(false) }: EditProfileModalProps = $props();

    let username = $state(user.current?.username);
    let email = $state(user.current?.email);

    let oldPassword = $state("");
    let password = $state("");
    let confirmPassword = $state("");

    const handleEditProfile = async () => {
        const updateUserDto: UpdateUserDto = {
            id: user.current?.id,
            username: username,
        };

        await patchUser(updateUserDto);
    };
</script>

{@render children()}

<Modal title="Edit Profile" bind:open autoclose>
    <div class="p-6">
        <Label for="username">Username</Label>
        <Input id="username" bind:value={username} />

        <div>
            <Label for="email">Email</Label>
            <Input id="email" type="email" bind:value={email} disabled />
        </div>
        <Tooltip>Changing email is currently unsupported</Tooltip>
        <div>
            <Label for="old_password">Old password</Label>
            <Input
                id="old_password"
                type="password"
                bind:value={oldPassword}
                disabled
            />
            <Label for="password">Password</Label>
            <Input
                id="password"
                type="password"
                bind:value={password}
                disabled
            />
            <Label for="confirm_password">Confirm Password</Label>
            <Input
                id="confirm_password"
                type="password"
                bind:value={confirmPassword}
                disabled
            />
        </div>
        <Tooltip>Changing password is currently unsupported</Tooltip>

        <div class="flex justify-end mt-6">
            <Button color="blue" onclick={handleEditProfile}
                >Save Changes</Button
            >
        </div>
    </div>
</Modal>
