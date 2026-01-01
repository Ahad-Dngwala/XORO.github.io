# Seed Database with Dummy Tasks

This guide will help you populate your database with sample tasks for testing.

## Quick Seed

Run the seed script to add 12 dummy tasks:

```bash
cd backend
npm run seed
```

## What Gets Created

The seed script creates 12 sample tasks distributed across the three columns:

- **Todo (5 tasks)**: Tasks waiting to be started
- **In Progress (3 tasks)**: Tasks currently being worked on
- **Done (4 tasks)**: Completed tasks

## Sample Tasks Include

- Design user interface mockups
- Set up development environment
- Implement authentication system
- Write API documentation
- Optimize database queries
- Add unit tests
- Deploy to production
- Code review and refactoring
- Implement drag and drop
- Add dark mode support
- Create user onboarding flow
- Performance optimization

## Clear Existing Data (Optional)

If you want to start fresh, you can modify `prisma/seed.js` and uncomment the lines that delete existing tasks:

```javascript
// Clear existing tasks
await prisma.task.deleteMany();
console.log('🗑️  Cleared existing tasks');
```

## Alternative: Manual SQL Insert

You can also insert tasks directly via SQL:

```sql
INSERT INTO tasks (id, title, description, status, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'Design user interface mockups', 'Create wireframes and high-fidelity designs', 'TODO', NOW(), NOW()),
  (gen_random_uuid(), 'Set up development environment', 'Install all required dependencies', 'DONE', NOW(), NOW()),
  (gen_random_uuid(), 'Implement authentication system', 'Add user login and session management', 'IN_PROGRESS', NOW(), NOW());
```

## Verify

After seeding, check your database:

```bash
# Using Prisma Studio
npm run prisma:studio

# Or check via API
curl http://localhost:3001/api/tasks
```

