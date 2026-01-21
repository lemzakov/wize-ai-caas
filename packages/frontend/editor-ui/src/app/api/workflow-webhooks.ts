import type { IUser } from '@n8n/rest-api-client/api/users';
import { post } from '@n8n/rest-api-client';

// Disabled external API calls - WIZE Platform runs independently
const N8N_API_BASE_URL = '';
const CONTACT_EMAIL_SUBMISSION_ENDPOINT = '/accounts/onboarding';

export async function submitEmailOnSignup(
	instanceId: string,
	currentUser: IUser,
	email: string | undefined,
	agree: boolean,
): Promise<string> {
	// External API call disabled for WIZE Platform
	return Promise.resolve('');
}
