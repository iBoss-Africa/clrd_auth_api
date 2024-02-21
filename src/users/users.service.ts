import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
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
            if(error instanceof Error){
                throw new BadRequestException('Bad request', error.message)
            }
        }
        
    }
    
    // async updateUser(id: number, updateUserDto:UpdateuserDto, user:User){
    //     const  {firstName, lastName, phone} = updateUserDto;

    //     if(id !== user.id){
    //         throw new NotFoundException('User not found!')
    //     }

    //     const updateUser = await this.prisma.user.update({
    //         where:{id: user.id},
    //         data: {firstName, lastName, phone}
    //     })
    //     return updateUser;
    // }

    // async updateCompany(userId: number, updateCompanyDto: UpdateCompanyDto, user:User){
        
    //     try{
    //         const {
    //             companyName,
    //             email,
    //             phone,
    //             country,
    //             state,
    //             city,
    //             streetAddress,
    //             postalCode,
    //             cacUrl,
    //             cacNo,
    //         } = updateCompanyDto;

    //         if(user.id !== userId){
    //             throw new UnauthorizedException('you can perform this operation!');
    //         }else{
    //             const newcompany = await this.prisma.company.create({
    //                 data:{
    //                     companyName,
    //                     email,
    //                     phone,
    //                     country,
    //                     state,
    //                     city,
    //                     streetAddress,
    //                     postalCode,
    //                     cacUrl,
    //                     cacNo,
    //                     }
    //                 })

    //             return newcompany
    //         }
    //     }catch(error){
    //         if(error instanceof Error){
    //             throw new BadRequestException('Bad request', error.message)
    //         }
    //     }
    // }
    
}
