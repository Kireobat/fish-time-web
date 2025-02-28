import { roomApi } from "$lib/api/apiClient";
import { type FishTimePageDtoRoomDto } from "$lib/generated/fish-time";

export const getRooms = async (page: number, size: number, sort: string[], id?: number, name?: string, minCapacity?: number, address?: string, activeOnly?: boolean): Promise<FishTimePageDtoRoomDto> => {
    return await roomApi.getRooms({ page, size, sort, id, name, minCapacity, address, activeOnly });
}