import { roomApi } from "$lib/api/apiClient";
import { type CreateRoomDto, type RoomDto } from "$lib/generated/fish-time";


export const createRoom = async (createRoomDto: CreateRoomDto): Promise<RoomDto> => {
    return await roomApi.createRoom({ createRoomDto: createRoomDto });
}