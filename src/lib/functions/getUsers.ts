import { UserControllerApi, type FishTimePageDtoUserDto } from "$lib/generated/fish-time";

const userApi = new UserControllerApi();

export const getUsers = async (page: number, size: number, sort: string[], id?: number, searchQuery?: string): Promise<FishTimePageDtoUserDto> => {
    return await userApi.getUsers({ page, size, sort, id, searchQuery });
}