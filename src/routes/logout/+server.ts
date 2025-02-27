import { envVariables } from '$lib/util/envVariables';
import { redirect } from '@sveltejs/kit';

export async function GET() {
    // Redirect to the logout URL
    throw redirect(302, `'${envVariables.backendUrl()}/logout`);
}
