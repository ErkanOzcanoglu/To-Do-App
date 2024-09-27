import z from "zod";

export const taskFormSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  deadline: z.string().nonempty(),
  deadlineTime: z.string().nonempty(),
});

export type TaskForm = z.infer<typeof taskFormSchema>;
