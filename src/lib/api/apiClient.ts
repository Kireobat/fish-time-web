// In a new file like $lib/api/apiClient.ts
import { AuthControllerApi, UserControllerApi, RoomControllerApi, MeetingControllerApi, ParticipantControllerApi } from "$lib/generated/fish-time";
import { Configuration } from "$lib/generated/fish-time/runtime";

const config = new Configuration({
    basePath: "http://localhost:8080/fish-time",
    credentials: "include"
});

export const authApi = new AuthControllerApi(config);
export const userApi = new UserControllerApi(config);
export const roomApi = new RoomControllerApi(config);
export const meetingApi = new MeetingControllerApi(config);
export const participantApi = new ParticipantControllerApi(config);