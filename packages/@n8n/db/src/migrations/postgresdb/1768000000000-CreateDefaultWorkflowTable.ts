import type { MigrationContext, ReversibleMigration } from '../migration-types';

/**
 * Migration to create the default_workflow table for storing
 * references to default workflow templates in source control.
 */
export class CreateDefaultWorkflowTable1768000000000 implements ReversibleMigration {
	async up({ queryRunner, tablePrefix }: MigrationContext) {
		await queryRunner.query(
			`CREATE TABLE ${tablePrefix}default_workflow (
				"id" VARCHAR(36) NOT NULL,
				"name" VARCHAR(255) NOT NULL,
				"description" TEXT NULL,
				"filePath" VARCHAR(500) NOT NULL,
				"category" VARCHAR(100) NULL,
				"tags" TEXT NULL,
				"isActive" BOOLEAN NOT NULL DEFAULT true,
				"displayOrder" INTEGER NOT NULL DEFAULT 0,
				"icon" VARCHAR(50) NULL,
				"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
				"updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
				CONSTRAINT "PK_${tablePrefix}default_workflow" PRIMARY KEY ("id")
			)`,
		);

		await queryRunner.query(
			`CREATE INDEX "IDX_${tablePrefix}default_workflow_name" ON ${tablePrefix}default_workflow ("name")`,
		);

		await queryRunner.query(
			`CREATE INDEX "IDX_${tablePrefix}default_workflow_category" ON ${tablePrefix}default_workflow ("category")`,
		);

		await queryRunner.query(
			`CREATE INDEX "IDX_${tablePrefix}default_workflow_isActive" ON ${tablePrefix}default_workflow ("isActive")`,
		);
	}

	async down({ queryRunner, tablePrefix }: MigrationContext) {
		await queryRunner.query(`DROP INDEX "IDX_${tablePrefix}default_workflow_isActive"`);
		await queryRunner.query(`DROP INDEX "IDX_${tablePrefix}default_workflow_category"`);
		await queryRunner.query(`DROP INDEX "IDX_${tablePrefix}default_workflow_name"`);
		await queryRunner.query(`DROP TABLE ${tablePrefix}default_workflow`);
	}
}
