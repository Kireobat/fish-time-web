import { meetingApi } from "$lib/api/apiClient";
import { ResponseError, type FishTimeResponseDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";


export const deleteMeeting = async (id: number): Promise<FishTimeResponseDto> => {

    try {
        const res = await meetingApi.deleteMeeting({ id: id });
        feedback.current?.push({
            message: "Meeting deleted successfully",
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