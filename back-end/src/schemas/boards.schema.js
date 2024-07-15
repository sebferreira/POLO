import {z} from "zod";

export const boardSchema = z.object({
  name: z
    .string({
      required_error: "the name board is required",
    })
    .min(3, {
      message: "the name board must be at least 3 characters long",
    })
    .max(30, {
      message: "the name board must not exceed 30 characters",
    }),
});

export const inviteBoardSchema = z.object({
  username: z
    .string({
      required_error: "the username to invite is required",
    })
    .min(3, {
      message: "the username to invite must be at least 3 characters long",
    })
    .max(20, {
      message: "the username to invite must not exceed 20 characters",
    }),
});
