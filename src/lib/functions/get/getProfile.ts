import { authApi } from "$lib/api/apiClient";
import { ResponseError, type FishTimeResponseDto, type UserDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";

export const getProfile = async (): Promise<UserDto> => {
    try {
        return await authApi.getProfile();
    } catch (error) {
        if (error instanceof ResponseError) {
            const res = await error.response.json() as FishTimeResponseDto;

            if (res.status?.toString() != "UNAUTHORIZED") {
                feedback.current?.push({
                    message: res.message!!,
                    type: "error"
                });
            }

            throw res;
        } else {
            console.error(error);
            throw error;
        }
    }
}