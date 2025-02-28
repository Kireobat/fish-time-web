import { userApi } from "$lib/api/apiClient";
import { type FishTimePageDtoUserDto } from "$lib/generated/fish-time";

export const getUsers = async (page: number, size: number, sort: string[], id?: number, searchQuery?: string): Promise<FishTimePageDtoUserDto> => {
    return await userApi.getUsers({ page, size, sort, id, searchQuery });
}