import { Column, Entity, Index } from '@n8n/typeorm';
import { Length } from 'class-validator';

import { WithTimestampsAndStringId } from './abstract-entity';

/**
 * Entity representing a default workflow template that can be loaded from source control.
 * These workflows are stored in a directory in the repository and can be imported into instances.
 */
@Entity()
export class DefaultWorkflow extends WithTimestampsAndStringId {
	@Index()
	@Length(1, 255, {
		message: 'Workflow name must be $constraint1 to $constraint2 characters long.',
	})
	@Column({ length: 255 })
	name: string;

	@Column({ type: 'text', nullable: true })
	description: string | null;

	/**
	 * Relative path to the workflow file in the source control repository
	 * Example: 'default-workflows/customer-onboarding.json'
	 */
	@Column({ length: 500 })
	filePath: string;

	/**
	 * Category for organizing default workflows
	 * Example: 'automotive', 'customer-service', 'general'
	 */
	@Column({ length: 100, nullable: true })
	category: string | null;

	/**
	 * Tags associated with the workflow for filtering and discovery
	 * Stored as JSON array
	 */
	@Column({ type: 'simple-array', nullable: true })
	tags: string[] | null;

	/**
	 * Whether this workflow should be available for import
	 */
	@Column({ default: true })
	isActive: boolean;

	/**
	 * Display order for listing workflows
	 */
	@Column({ default: 0 })
	displayOrder: number;

	/**
	 * Icon or emoji to represent the workflow
	 */
	@Column({ length: 50, nullable: true })
	icon: string | null;
}
