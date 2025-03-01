import { userApi } from "$lib/api/apiClient";
import { ResponseError, type CreateUserDto, type FishTimeResponseDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";


export const createUsers = async (createUserDtoList: CreateUserDto[]): Promise<FishTimeResponseDto> => {
    try {
        const res = await userApi.createUser({ createUserDto: createUserDtoList });
        feedback.current?.push({
            message: res.message!!,
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