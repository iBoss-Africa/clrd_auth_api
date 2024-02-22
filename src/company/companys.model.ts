import { $Enums, Prisma } from "@prisma/client";

export class Companys implements Prisma.CompanyCreateInput{
    id: Number;
    companyName: string;
    email: string;
    phone: string;
    category?: $Enums.companyCategory;
    country?: string;
    state?: string;
    city?: string;
    streetAddress?: string;
    postalCode?: string;
    cacUrl?: string;
    cacNo?: string;
    deleted?: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    
}

