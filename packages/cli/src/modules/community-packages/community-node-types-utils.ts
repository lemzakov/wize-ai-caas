import type { INodeTypeDescription } from 'n8n-workflow';

import { paginatedRequest } from './strapi-utils';

export type StrapiCommunityNodeType = {
	authorGithubUrl: string;
	authorName: string;
	checksum: string;
	description: string;
	displayName: string;
	name: string;
	numberOfStars: number;
	numberOfDownloads: number;
	packageName: string;
	createdAt: string;
	updatedAt: string;
	npmVersion: string;
	isOfficialNode: boolean;
	companyName?: string;
	nodeDescription: INodeTypeDescription;
	nodeVersions?: Array<{ npmVersion: string; checksum: string }>;
};

// Disabled external API calls - WIZE Platform runs independently
const N8N_VETTED_NODE_TYPES_STAGING_URL = '';
const N8N_VETTED_NODE_TYPES_PRODUCTION_URL = '';

export async function getCommunityNodeTypes(
	environment: 'staging' | 'production',
): Promise<StrapiCommunityNodeType[]> {
	// External API call disabled for WIZE Platform
	return Promise.resolve([]);
}
