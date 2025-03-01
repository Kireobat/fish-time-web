import { roomApi } from "$lib/api/apiClient";
import { ResponseError, type FishTimePageDtoRoomDto, type FishTimeResponseDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";

export const getRooms = async (page: number, size: number, sort: string[], id?: number, name?: string, minCapacity?: number, address?: string, activeOnly?: boolean): Promise<FishTimePageDtoRoomDto> => {
    try {
        return await roomApi.getRooms({ page, size, sort, id, name, minCapacity, address, activeOnly });
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