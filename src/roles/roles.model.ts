import { Prisma } from "@prisma/client";

export class Roles implements Prisma.RoleCreateInput {
    id: number;
    name: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    permission: any;
}