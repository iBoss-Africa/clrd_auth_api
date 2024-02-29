import { Prisma } from "@prisma/client";

export class Permissions implements Prisma.PermissionCreateInput {
    id: number;
    subject: string;
    action: string;
    conditions?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    inverted?: boolean;
    reason?: string;
    roleId: number;
    role: Prisma.RoleCreateNestedOneWithoutPermissionInput;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}