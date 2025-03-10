import { participantApi } from "$lib/api/apiClient";
import { ResponseError, type CreateParticipantDto, type FishTimeResponseDto, type ParticipantDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";

export const createParticipant = async (createParticipantDto: CreateParticipantDto): Promise<ParticipantDto> => {
    try {
        const res = await participantApi.addParticipant({ createParticipantDto: createParticipantDto });
        feedback.current?.push({
            message: "Added participant successfully",
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