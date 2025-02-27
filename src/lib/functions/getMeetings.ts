import { MeetingControllerApi, type FishTimePageDtoMeetingDto } from "$lib/generated/fish-time";

const meetingApi = new MeetingControllerApi();

export const getMeetings = async (page: number, size: number, sort: string[], id?: number, searchQuery?: string, startTime?: Date, endTime?: Date, roomId?: number, createdBy?: number, participants?: number[]): Promise<FishTimePageDtoMeetingDto> => {
    return await meetingApi.getMeetings({ page, size, sort, id, searchQuery, startTime, endTime, roomId, createdBy, participants });
}