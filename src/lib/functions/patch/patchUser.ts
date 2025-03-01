import { userApi } from "$lib/api/apiClient";
import { ResponseError, type FishTimeResponseDto, type UpdateUserDto, type UserDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";


export const patchUser = async (updateUserDto: UpdateUserDto): Promise<UserDto> => {
    try {
        const res = await userApi.updateUser({ updateUserDto: updateUserDto });
        feedback.current?.push({
            message: "Profile updated successfully",
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