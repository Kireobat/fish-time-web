import { AuthControllerApi, type UserDto } from "$lib/generated/fish-time";

const authApi = new AuthControllerApi();

export const getProfile = async (): Promise<UserDto> => {
    return await authApi.getProfile({ credentials: "include" });
}