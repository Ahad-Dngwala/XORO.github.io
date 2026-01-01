import { z } from 'zod';

export const taskStatusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  status: taskStatusEnum.optional().default('TODO'),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').optional(),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional().nullable(),
  status: taskStatusEnum.optional(),
});

export const validateCreateTask = (req, res, next) => {
  try {
    req.body = createTaskSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateUpdateTask = (req, res, next) => {
  try {
    req.body = updateTaskSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

