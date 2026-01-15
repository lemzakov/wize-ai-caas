import type { MigrationContext, ReversibleMigration } from '../migration-types';

/**
 * Migration to create the default_workflow table for storing
 * references to default workflow templates in source control.
 */
export class CreateDefaultWorkflowTable1768000000000 implements ReversibleMigration {
	async up({ queryRunner, tablePrefix }: MigrationContext) {
		await queryRunner.query(
			'CREATE TABLE `' +
				tablePrefix +
				'default_workflow` (' +
				'`id` VARCHAR(36) NOT NULL, ' +
				'`name` VARCHAR(255) NOT NULL, ' +
				'`description` TEXT NULL, ' +
				'`filePath` VARCHAR(500) NOT NULL, ' +
				'`category` VARCHAR(100) NULL, ' +
				'`tags` TEXT NULL, ' +
				'`isActive` BOOLEAN NOT NULL DEFAULT true, ' +
				'`displayOrder` INT NOT NULL DEFAULT 0, ' +
				'`icon` VARCHAR(50) NULL, ' +
				'`createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), ' +
				'`updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), ' +
				'INDEX `IDX_' +
				tablePrefix +
				'default_workflow_name` (`name`), ' +
				'INDEX `IDX_' +
				tablePrefix +
				'default_workflow_category` (`category`), ' +
				'INDEX `IDX_' +
				tablePrefix +
				'default_workflow_isActive` (`isActive`), ' +
				'PRIMARY KEY (`id`)' +
				') ENGINE=InnoDB',
		);
	}

	async down({ queryRunner, tablePrefix }: MigrationContext) {
		await queryRunner.query('DROP TABLE `' + tablePrefix + 'default_workflow`');
	}
}
