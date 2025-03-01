import { meetingApi } from "$lib/api/apiClient";
import { ResponseError, type FishTimePageDtoMeetingDto, type FishTimeResponseDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";


export const getMeetings = async (page: number, size: number, sort: string[], id?: number, searchQuery?: string, startTime?: Date, endTime?: Date, roomId?: number, createdBy?: number, participants?: number[]): Promise<FishTimePageDtoMeetingDto> => {
    try {
        return await meetingApi.getMeetings({ page, size, sort, id, searchQuery, startTime, endTime, roomId, createdBy, participants });
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