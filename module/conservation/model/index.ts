import { z } from "zod";

export const conservationSchema = z.object({
  id: z.string().uuid(),

  userId: z.string().uuid(),

  managerId: z.string().uuid().nullable(),

  status: z.enum(["waiting", "chatting", "closed"]),

  lastMessage: z.string().nullable(),

  lastMessageAt: z.date().nullable(),

  created_at: z.date(),

  updated_at: z.date(),

  closed_at: z.date().nullable(),
});

export type Conservation = z.infer<typeof conservationSchema>;

export const createConservationSchema = conservationSchema
  .pick({
    userId: true,
  })
  .required();

export type ICreateConservationForm = z.infer<typeof createConservationSchema>;

export const takeConservationSchema = conservationSchema
  .pick({
    managerId: true,
  })
  .required();

export type ITakeConservationForm = z.infer<typeof takeConservationSchema>;

export const closeConservationSchema = conservationSchema
  .pick({
    id: true,
  })
  .required();

export type ICloseConservationForm = z.infer<typeof closeConservationSchema>;

// ******************* Message *******************
export const messageSchema = z.object({
  id: z.string().uuid(),

  conservationId: z.string().uuid(),

  senderId: z.string().uuid(),

  senderRole: z.enum(["user", "manager"]),

  content: z.string().min(1),

  created_at: z.date(),
});

export type Message = z.infer<typeof messageSchema>;

export const sendMessageSchema = z.object({
  content: z.string().min(1),
});

export type ISendMessageForm = z.infer<typeof sendMessageSchema>;
