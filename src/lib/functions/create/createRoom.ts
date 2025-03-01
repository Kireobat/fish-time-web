import { roomApi } from "$lib/api/apiClient";
import { ResponseError, type CreateRoomDto, type FishTimeResponseDto, type RoomDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";


export const createRoom = async (createRoomDto: CreateRoomDto): Promise<RoomDto> => {
    try {
        const res = await roomApi.createRoom({ createRoomDto: createRoomDto });
        feedback.current?.push({
            message: "Created room successfully",
            type: "success"
        });
        return res;
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