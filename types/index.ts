import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createAt" | "updateAt" | "emailVertified"
> & {
  createAt: string;
  updateAt: string;
  emailVerified: string | null;
};
