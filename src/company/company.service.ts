import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateCompanyDto } from './dto/update.company.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CompanyService {
    constructor(
        private prisma: PrismaService,
        private userService:UsersService
         ){}

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
                throw new BadRequestException( 'Bad request', error.message);
            }
        }
        
    }

    async create(companySignUpDto){
        try{
            const { companyName, email, phone} = companySignUpDto;
        
            const company = await this.getOne({email});
            if(company) throw new ConflictException('Email already exist!');
    
            // Creating the new company
             const newCompany = await this.prisma.company.create({
                 data: {
                     companyName, 
                     email, 
                     phone
                 }
             });
    
            // Creating admin new user
            const newUser = await this.userService.Signup(companySignUpDto);
            return {companyData: newCompany, userData: newUser};
        }catch(error){
            if(error instanceof Error){
                throw new BadRequestException( 'Bad request', error.message)
            }
        }
    }

    async  updateOne(id: number, updateCompanyDto: UpdateCompanyDto){
        try{
            const {category,country, state,city, streetAddress, postalCode,cacNo,cacUrl, admin_id} = updateCompanyDto;
            const userId = parseInt(admin_id);
            
            const company = await this.getOne({id});
            if (!company) {
                throw new NotFoundException('Company not found');
            }

            const updatedCompany = await this.prisma.company.update({
                where: {id: id},
                data: {category,country, state,city, streetAddress, postalCode,cacNo,cacUrl, admin_id: userId}
            })

            return updatedCompany;

        }catch(error){
            if(error instanceof Error){
                throw new BadRequestException( 'Bad request', error.message)
            }
        }
        


    }


}
