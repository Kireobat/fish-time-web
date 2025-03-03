import { authApi } from "$lib/api/apiClient";
import { ResponseError, type FishTimeResponseDto, type LoginDto } from "$lib/generated/fish-time";
import { feedback } from "../feedback.svelte";


export const isAdmin = async (): Promise<boolean> => {
    try {
        return await authApi.getAdminStatus();
    } catch (error) {
        if (error instanceof ResponseError) {
            const res = await error.response.json() as FishTimeResponseDto;

            if (res.status?.toString() != "UNAUTHORIZED") {
                feedback.current?.push({
                    message: res.message!!,
                    type: "error"
                });
            }

            return false;
        } else {
            console.error(error);
            return false;
        }
    }
}