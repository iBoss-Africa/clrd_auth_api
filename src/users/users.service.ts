import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';

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

    // fetch all users
    async getAll(){
        try{
            // get all users from the database
            const users = await this.prisma.user.findMany({where: {deleted: false}});

            return users;
        }catch(error){
            if(error instanceof Error){
                throw new BadRequestException( 'Bad request', error.message)
            }
        }
        
    }

    // View Trash
    async viewTrash(){
        try{
            // get all users from the database
            const users = await this.prisma.user.findMany({where: {deleted: true}});

            return users;
        }catch(error){
            if(error instanceof Error){
                throw new BadRequestException( 'Bad request', error.message)
            }
        }
        
    }

    // Update user
    async updateUser(id: number, updateUserDto:UpdateUserDto, user:User){
        console.log(updateUserDto)
        try{
            const  {
                firstName, 
                lastName, 
                avatar, 
                country,
                driverLicenseNo,
                state,
                city,
                streetAddress,
                postalCode,
                driverLicenseUrl,
             } = updateUserDto;
    
            if(id !== user.id){
                throw new NotFoundException('User not found!')
            }
    
            const updateUser = await this.prisma.user.update({
                where:{id: user.id},
                data: {
                    firstName, 
                    lastName, 
                    avatar, 
                    country,
                    driverLicenseNo,
                    state,
                    city,
                    streetAddress,
                    driverLicenseUrl,
                    postalCode,
                }
            })
            return updateUser;
        }catch(error){
            if(error instanceof Error){
                throw new BadRequestException( 'Bad request', error.message)
            }
        }
    }

    // Delete User
    async softDelet(id: number){
        const user = this.getOne({id}); 

        return await this.prisma.user.update({
            where: {id: id},
            data: {deleted: true}
        })
    }
}
