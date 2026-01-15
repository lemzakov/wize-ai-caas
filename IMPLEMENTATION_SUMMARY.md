# WIZE Platform Branding and Default Workflows - Implementation Summary

## Overview

This implementation updates the n8n platform branding to **WIZE Платформа по цифровизации и автоматизации взаимодействия с клиентом в рамках жизненного цикла подписки на автомобиль** (WIZE Platform for Customer Interaction Digitization and Automation within the Car Subscription Lifecycle) and introduces a database table for managing default workflow templates.

## Changes Made

### 1. Branding Updates

#### UI Components
- **File**: `packages/frontend/editor-ui/src/app/components/AboutModal.vue`
  - Added platform name display in About modal
  - Added styling for prominent display of platform name
  - Platform name shown in Russian as the primary identifier

#### Internationalization
- **File**: `packages/frontend/@n8n/i18n/src/locales/en.json`
  - Updated all `about.*` translations to Russian
  - Added new `about.platformName` key with full WIZE platform name
  - Translated all About modal strings (buttons, labels, messages)

### 2. Database Schema - Default Workflows Table

#### Entity Definition
- **File**: `packages/@n8n/db/src/entities/default-workflow.ts`
  - Created `DefaultWorkflow` entity class
  - Extends `WithTimestampsAndStringId` for standard ID and timestamp fields

#### Table Structure
```typescript
{
  id: string;              // UUID primary key
  name: string;            // Workflow name (max 255 chars)
  description: string;     // Optional detailed description
  filePath: string;        // Path to workflow JSON file (max 500 chars)
  category: string;        // Optional category for organization
  tags: string[];          // Optional tags for filtering
  isActive: boolean;       // Whether workflow is available (default: true)
  displayOrder: number;    // Display ordering (default: 0)
  icon: string;            // Optional icon/emoji
  createdAt: timestamp;    // Auto-generated creation time
  updatedAt: timestamp;    // Auto-updated modification time
}
```

#### Indexes
- `IDX_default_workflow_name` - on `name` field
- `IDX_default_workflow_category` - on `category` field  
- `IDX_default_workflow_isActive` - on `isActive` field

#### Migrations
Created migration files for all three supported databases:
- **PostgreSQL**: `packages/@n8n/db/src/migrations/postgresdb/1768000000000-CreateDefaultWorkflowTable.ts`
- **MySQL**: `packages/@n8n/db/src/migrations/mysqldb/1768000000000-CreateDefaultWorkflowTable.ts`
- **SQLite**: `packages/@n8n/db/src/migrations/sqlite/1768000000000-CreateDefaultWorkflowTable.ts`

Each migration includes:
- `up()` method to create the table and indexes
- `down()` method to revert changes

#### Entity Registration
- **File**: `packages/@n8n/db/src/entities/index.ts`
  - Added `DefaultWorkflow` to exports
  - Added to `entities` object for TypeORM registration

- **Files**: Migration index files for each database
  - `packages/@n8n/db/src/migrations/postgresdb/index.ts`
  - `packages/@n8n/db/src/migrations/mysqldb/index.ts`
  - `packages/@n8n/db/src/migrations/sqlite/index.ts`
  - Registered new migration in each index

### 3. Documentation

#### Russian Manual
- **File**: `DEFAULT_WORKFLOWS_MANUAL_RU.md`
  - Comprehensive guide in Russian
  - Table structure documentation
  - SQL examples for CRUD operations
  - Best practices and recommendations
  - Troubleshooting section
  - Recommended categories for WIZE platform
  - Example workflows for automotive subscription use cases

#### Default Workflows Directory
- **Created**: `default-workflows/` directory structure
  - `automotive/` - Automotive subscription workflows
  - Directory can be extended with additional categories

- **File**: `default-workflows/README.md`
  - Bilingual (Russian/English) overview
  - Directory structure explanation
  - Usage instructions
  - Links to detailed manual

### 4. Example Default Workflow

- **File**: `default-workflows/automotive/subscription-onboarding.json`
  - Complete example of subscription onboarding workflow
  - Includes:
    - Webhook trigger for new subscriptions
    - Database customer creation
    - Welcome email sending
    - Team notification via Slack
  - Tagged with: automotive, onboarding, subscription
  - Demonstrates proper workflow JSON structure

## Usage Instructions

### Running Migrations

To apply the database changes:

```bash
# PostgreSQL
pnpm migration:run:postgres

# MySQL  
pnpm migration:run:mysql

# SQLite
pnpm migration:run:sqlite
```

### Adding a Default Workflow

1. Create workflow JSON file in appropriate category directory under `default-workflows/`
2. Add entry to `default_workflow` table:

```sql
INSERT INTO default_workflow (
    id, name, description, filePath, category, tags, 
    isActive, displayOrder, icon
) VALUES (
    gen_random_uuid(),
    'Workflow Name',
    'Detailed description',
    'default-workflows/category/filename.json',
    'category',
    'tag1,tag2,tag3',
    true,
    10,
    '🚗'
);
```

### Querying Default Workflows

```sql
-- Get all active workflows
SELECT * FROM default_workflow 
WHERE isActive = true 
ORDER BY displayOrder, name;

-- Get workflows by category
SELECT * FROM default_workflow 
WHERE category = 'automotive' AND isActive = true;
```

## File Changes Summary

### Modified Files (6)
1. `packages/@n8n/db/src/entities/index.ts` - Added DefaultWorkflow export
2. `packages/@n8n/db/src/migrations/postgresdb/index.ts` - Registered migration
3. `packages/@n8n/db/src/migrations/mysqldb/index.ts` - Registered migration
4. `packages/@n8n/db/src/migrations/sqlite/index.ts` - Registered migration
5. `packages/frontend/@n8n/i18n/src/locales/en.json` - Russian translations
6. `packages/frontend/editor-ui/src/app/components/AboutModal.vue` - WIZE branding

### New Files (7)
1. `packages/@n8n/db/src/entities/default-workflow.ts` - Entity definition
2. `packages/@n8n/db/src/migrations/postgresdb/1768000000000-CreateDefaultWorkflowTable.ts`
3. `packages/@n8n/db/src/migrations/mysqldb/1768000000000-CreateDefaultWorkflowTable.ts`
4. `packages/@n8n/db/src/migrations/sqlite/1768000000000-CreateDefaultWorkflowTable.ts`
5. `DEFAULT_WORKFLOWS_MANUAL_RU.md` - Comprehensive Russian manual
6. `default-workflows/README.md` - Directory documentation
7. `default-workflows/automotive/subscription-onboarding.json` - Example workflow

## Next Steps

To complete the implementation:

1. **Test migrations** - Run migrations on test databases to verify they execute correctly
2. **Build validation** - Run `pnpm build` to ensure no TypeScript errors
3. **UI testing** - Open the About modal to verify WIZE branding displays correctly
4. **Create additional workflows** - Add more default workflow templates for common use cases
5. **Implement import functionality** - Create backend API and frontend UI to import default workflows

## Notes

- All changes are minimal and focused on the specific requirements
- Existing functionality is preserved
- Database migrations are reversible
- Documentation is comprehensive and in Russian as requested
- Example workflow demonstrates proper structure and WIZE platform use case
