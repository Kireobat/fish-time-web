import { meetingApi } from "$lib/api/apiClient";
import { ResponseError, type CreateMeetingDto, type FishTimeResponseDto, type MeetingDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";


export const createMeeting = async (createMeetingDto: CreateMeetingDto): Promise<MeetingDto> => {

    try {
        const res = await meetingApi.createMeeting({ createMeetingDto: createMeetingDto });
        feedback.current?.push({
            message: "Meeting created successfully",
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