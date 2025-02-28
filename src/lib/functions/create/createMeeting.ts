import { meetingApi } from "$lib/api/apiClient";
import { type CreateMeetingDto, type MeetingDto } from "$lib/generated/fish-time";


export const createMeeting = async (createMeetingDto: CreateMeetingDto): Promise<MeetingDto> => {
    return await meetingApi.createMeeting({ createMeetingDto: createMeetingDto });
}