import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService ){}

    // get a one company
    async getOne(criteria: Prisma.CompanyWhereUniqueInput): Promise<any>{
        try{
            // Check for the user with the id
            const company = await this.prisma.company.findUnique({
                where: {...criteria, deleted: false}
                
            });

            return company;
        }catch(error){
            if(error instanceof Error){
                throw new BadRequestException('Bad request', error.message);
            }
        }
        
    }
}
