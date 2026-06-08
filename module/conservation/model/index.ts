import { z } from "zod";

export const conversationSchema = z.object({
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

export type Conversation = z.infer<typeof conversationSchema>;

export const createConversationSchema = conversationSchema
  .pick({
    userId: true,
  })
  .required();

export type ICreateConversationForm = z.infer<typeof createConversationSchema>;

export const takeConversationSchema = conversationSchema
  .pick({
    managerId: true,
  })
  .required();

export type ITakeConversationForm = z.infer<typeof takeConversationSchema>;

export const closeConversationSchema = conversationSchema
  .pick({
    id: true,
  })
  .required();

export type ICloseConversationForm = z.infer<typeof closeConversationSchema>;

// ******************* Message *******************
export const messageSchema = z.object({
  id: z.string().uuid(),

  conversationId: z.string().uuid(),

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
