import { userApi } from "$lib/api/apiClient";
import { type CreateUserDto, type FishTimeResponseDto } from "$lib/generated/fish-time";


export const createUsers = async (createUserDtoList: CreateUserDto[]): Promise<FishTimeResponseDto> => {
    return await userApi.createUser({ createUserDto: createUserDtoList });
}