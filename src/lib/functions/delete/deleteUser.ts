import { userApi } from "$lib/api/apiClient";
import { ResponseError, type DeleteUserRequest, type FishTimeResponseDto, type UserDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";


export const deleteUser = async (deleteUserRequest: DeleteUserRequest): Promise<FishTimeResponseDto> => {
    try {
        const res = await userApi.deleteUser(deleteUserRequest);
        feedback.current?.push({
            message: "Profile deleted successfully",
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