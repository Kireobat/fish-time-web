import type { UserDto } from "$lib/generated/fish-time";

export const user: { current: UserDto | undefined } = $state({ current: undefined })