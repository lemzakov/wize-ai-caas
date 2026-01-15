import type { MigrationContext, ReversibleMigration } from '../migration-types';

/**
 * Migration to create the default_workflow table for storing
 * references to default workflow templates in source control.
 */
export class CreateDefaultWorkflowTable1768000000000 implements ReversibleMigration {
	async up({ queryRunner, tablePrefix }: MigrationContext) {
		await queryRunner.query(
			`CREATE TABLE "${tablePrefix}default_workflow" (
				"id" varchar(36) PRIMARY KEY NOT NULL,
				"name" varchar(255) NOT NULL,
				"description" text NULL,
				"filePath" varchar(500) NOT NULL,
				"category" varchar(100) NULL,
				"tags" text NULL,
				"isActive" boolean NOT NULL DEFAULT (1),
				"displayOrder" integer NOT NULL DEFAULT (0),
				"icon" varchar(50) NULL,
				"createdAt" datetime(3) NOT NULL DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')),
				"updatedAt" datetime(3) NOT NULL DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW'))
			)`,
		);

		await queryRunner.query(
			`CREATE INDEX "IDX_${tablePrefix}default_workflow_name" ON "${tablePrefix}default_workflow" ("name")`,
		);

		await queryRunner.query(
			`CREATE INDEX "IDX_${tablePrefix}default_workflow_category" ON "${tablePrefix}default_workflow" ("category")`,
		);

		await queryRunner.query(
			`CREATE INDEX "IDX_${tablePrefix}default_workflow_isActive" ON "${tablePrefix}default_workflow" ("isActive")`,
		);
	}

	async down({ queryRunner, tablePrefix }: MigrationContext) {
		await queryRunner.query(`DROP INDEX "IDX_${tablePrefix}default_workflow_isActive"`);
		await queryRunner.query(`DROP INDEX "IDX_${tablePrefix}default_workflow_category"`);
		await queryRunner.query(`DROP INDEX "IDX_${tablePrefix}default_workflow_name"`);
		await queryRunner.query(`DROP TABLE "${tablePrefix}default_workflow"`);
	}
}
