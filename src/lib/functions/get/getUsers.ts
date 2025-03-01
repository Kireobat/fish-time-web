import { userApi } from "$lib/api/apiClient";
import { ResponseError, type FishTimePageDtoUserDto, type FishTimeResponseDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";

export const getUsers = async (page: number, size: number, sort: string[], id?: number, searchQuery?: string): Promise<FishTimePageDtoUserDto> => {
    try {
        return await userApi.getUsers({ page, size, sort, id, searchQuery });
    } catch (error) {
        if (error instanceof ResponseError) {
            const res = await error.response.json() as FishTimeResponseDto;

            feedback.current?.push({
                message: res.message!!,
                type: "error"
            });

            throw res;
        } else {
            console.error(error);
            throw error;
        }
    }
}