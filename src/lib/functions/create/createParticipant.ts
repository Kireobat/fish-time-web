import { participantApi } from "$lib/api/apiClient";
import { type CreateParticipantDto, type ParticipantDto } from "$lib/generated/fish-time";

export const createParticipant = async (createParticipantDto: CreateParticipantDto): Promise<ParticipantDto> => {
    return await participantApi.addParticipant({ createParticipantDto: createParticipantDto });
}