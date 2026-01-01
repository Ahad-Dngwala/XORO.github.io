import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dummyTasks = [
  {
    title: 'Design user interface mockups',
    description: 'Create wireframes and high-fidelity designs for the dashboard and task management views',
    status: 'TODO',
  },
  {
    title: 'Set up development environment',
    description: 'Install all required dependencies and configure the development workspace',
    status: 'DONE',
  },
  {
    title: 'Implement authentication system',
    description: 'Add user login, registration, and session management functionality',
    status: 'IN_PROGRESS',
  },
  {
    title: 'Write API documentation',
    description: 'Document all REST endpoints with request/response examples and error codes',
    status: 'TODO',
  },
  {
    title: 'Optimize database queries',
    description: 'Review and optimize slow queries, add necessary indexes',
    status: 'TODO',
  },
  {
    title: 'Add unit tests',
    description: 'Write comprehensive unit tests for critical business logic',
    status: 'IN_PROGRESS',
  },
  {
    title: 'Deploy to production',
    description: 'Set up CI/CD pipeline and deploy application to production environment',
    status: 'TODO',
  },
  {
    title: 'Code review and refactoring',
    description: 'Review codebase and refactor for better maintainability',
    status: 'DONE',
  },
  {
    title: 'Implement drag and drop',
    description: 'Add smooth drag and drop functionality for task cards',
    status: 'DONE',
  },
  {
    title: 'Add dark mode support',
    description: 'Implement theme switching with dark mode option',
    status: 'TODO',
  },
  {
    title: 'Create user onboarding flow',
    description: 'Design and implement welcome tour for new users',
    status: 'IN_PROGRESS',
  },
  {
    title: 'Performance optimization',
    description: 'Optimize bundle size and improve page load times',
    status: 'TODO',
  },
];

async function main() {
  console.log('🌱 Seeding database with dummy tasks...');

  // Clear existing tasks (optional - comment out if you want to keep existing data)
  // await prisma.task.deleteMany();
  // console.log('🗑️  Cleared existing tasks');

  // Create dummy tasks
  for (const task of dummyTasks) {
    await prisma.task.create({
      data: task,
    });
  }

  console.log(`✅ Created ${dummyTasks.length} dummy tasks`);
  console.log('📊 Task distribution:');
  console.log(`   - TODO: ${dummyTasks.filter(t => t.status === 'TODO').length}`);
  console.log(`   - IN_PROGRESS: ${dummyTasks.filter(t => t.status === 'IN_PROGRESS').length}`);
  console.log(`   - DONE: ${dummyTasks.filter(t => t.status === 'DONE').length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

