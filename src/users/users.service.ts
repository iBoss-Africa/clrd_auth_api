import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserSignUpDto } from 'src/users/dto/userSignup.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
    ){}


    // get a single user
    async getOne(criteria: any): Promise<User> {
        try {
            // Check for the user with the id
            const user = await this.prisma.user.findUnique({
                where: { ...criteria, deleted: false }
            });

            if(!user){
                throw new NotFoundException('User not found!');
            }

            return  user;
        }catch(error){
            if(error instanceof Error){
                throw new BadRequestException('Bad request', error.message)
            }
        }

    }

    // fetch all users
    async getAll(){
        try{
            const users = await this.prisma.user.findMany({where: {deleted: false}});

            return users;
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException('Bad request', error.message)
            }
        }

    }

     // Signup users
     async Signup(userSignUpDto:UserSignUpDto): Promise<{}>{

        try{

            // Extract the fields from the signuDto
            const {firstName, lastName, email, phone, password} = userSignUpDto;
            // check if the email already exist
            const user = await this.getOne({email});
            if(user) throw new ConflictException('Email already exist!');

            const salt = 10
            const hashPassword = await bcrypt.hash(password, salt);

            // Creating the new user
            const newUser = await this.prisma.user.create({
                data: {
                    firstName, 
                    lastName, 
                    email, 
                    phone, 
                    password: hashPassword
                }
            });
            return {data: newUser};
        }catch(error){
            if(error instanceof Error){
                console.log(error.stack)
                throw new BadRequestException('Bad request', error.message);
            }
        }
    }

    // View Trash

    async viewTrash(){
        try{
            const users = await this.prisma.user.findMany({where: {deleted: true}});

            return users;
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException('Bad request', error.message)
            }
        }

    }

    // Update user
    async updateUser(id: number, updateUserDto: UpdateUserDto, user: User) {
        try {
            const {
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

            if (id !== user.id) {
                throw new NotFoundException('User not found!')
            }

            const updateUser = await this.prisma.user.update({
                where: { id: user.id },
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
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException('Bad request', error.message)
            }
        }
    }

    // Restore
    async restoreUser(id: number){
        try{
            this.getOne({id}); 

            return await this.prisma.user.update({
                where: {id: id},
                data: {deleted: false}
            })
        }catch(error){
            if(error instanceof Error){
                throw new BadRequestException( 'Bad request', error.message)
            }
        }
        
    }

    // Delete User
    async softDelet(id: number){

        try{
            this.getOne({id}); 

            return await this.prisma.user.update({
                where: {id: id},
                data: {deleted: true}
            })
        }catch(error){
            if(error instanceof Error){
                throw new BadRequestException( 'Bad request', error.message)
            }
        }
    }
}
