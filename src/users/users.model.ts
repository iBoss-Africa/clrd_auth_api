import { Prisma } from "@prisma/client";

export class Users implements Prisma.UserCreateInput{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    avatar?: string;
    isActive?: boolean;
    deleted?: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    role: Prisma.RoleCreateNestedOneWithoutUserInput;
   
}

