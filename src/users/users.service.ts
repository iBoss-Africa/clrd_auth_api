import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateCompanyDto } from './dto/update.company.dto';
import { UpdateuserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ){}

    // get a single user
    async getOne(criteria: Prisma.UserWhereUniqueInput): Promise<any>{
        try{
                // Check for the user with the id
            const user = await this.prisma.user.findUnique({
                where: {...criteria, deleted: false}
                
            });

            return user;
        }catch(error){
           console.log(error)
        }
        
    }
    
    async updateUser(id: number, updateUserDto:UpdateuserDto, user:User){
        const  {firstName, lastName, phone} = updateUserDto;

        if(id !== user.id){
            throw new NotFoundException('User not found!')
        }

        const updateUser = await this.prisma.user.update({
            where:{id: user.id},
            data: {firstName, lastName, phone}
        })
    }

    async updateCompany(userId: number, updateCompanyDto: UpdateCompanyDto, user:User){
        const {
            companyName,
            country,
            state,
            city,
            streetAddress,
            postalCode,
            cacUrl,
            cacNo,
        } = updateCompanyDto
        try{
            if(user.id !== userId){
                throw new UnauthorizedException('you can perform this operation!')
            }else{
                // const company = await this.prisma.company.create({where:{
                //     data:{companyName,
                //         country,
                //         state,
                //         city,
                //         streetAddress,
                //         postalCode,
                //         cacUrl,
                //         cacNo,
                //         userId: user.id}
                // }})
            }
            
        }catch(error){
            if(error instanceof Error){
                return HttpStatus.BAD_REQUEST;
            }
        }
    }
    
}
