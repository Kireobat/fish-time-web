import { authApi } from "$lib/api/apiClient";
import { type UserDto } from "$lib/generated/fish-time";

export const getProfile = async (): Promise<UserDto> => {
    return await authApi.getProfile();
}