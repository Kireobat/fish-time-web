import { meetingApi } from "$lib/api/apiClient";
import { ResponseError, type FishTimeResponseDto, type MeetingDto, type RoomDto, type UpdateMeetingDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";


export const patchMeeting = async (UpdateMeetingDto: UpdateMeetingDto): Promise<MeetingDto> => {
    try {
        const res = await meetingApi.editMeeting({ updateMeetingDto: UpdateMeetingDto });
        feedback.current?.push({
            message: "Updated meeting successfully",
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