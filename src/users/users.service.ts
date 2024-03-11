import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserSignUpDto } from 'src/users/dto/userSignup.dto';
import * as bcrypt from 'bcryptjs';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        // private roles: RolesService
    ){}


    // get a single user
    async getOne(criteria: any): Promise<User> {
            const user = await this.prisma.user.findUnique({
                where: { ...criteria}
            });
            if(!user) throw new NotFoundException('User not found!');
            return  user;

    }

    async getUserRole(id: number): Promise<User>{
         const user = await this.prisma.user.findUnique({
            where: {id: id},
            include: {role: true}
        });
        if(!user) throw new NotFoundException('User not found!');
        return  user;
    }

    // fetch all users
    async getAll(){
        const users = await this.prisma.user.findMany({where: {deleted: false}});
        return users;
    }

     // Signup users
     async Signup(userSignUpDto:UserSignUpDto): Promise<{}>{
        const {firstName, lastName, email, phone, password} = userSignUpDto;
        // const user =  this.getOne({email});

        // if(user){ throw  new ConflictException('Email already exist!');}

        const salt = 10
        const hashPassword = await bcrypt.hash(password, salt);

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
        
    }

    // View Trash

    async viewTrash(){
        const users = await this.prisma.user.findMany({where: {deleted: true}});
        return users;
    }

    // Update user
    async updateUser(id: number, updateUserDto: UpdateUserDto, user: User) {
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
            throw new UnauthorizedException('you are not allowed!')
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
    }

    // Restore
    async restoreUser(id: number){
        this.getOne({id}); 

        return await this.prisma.user.update({
            where: {id: id},
            data: {deleted: false}
        })
    }

    // Delete User
    async softDelete(id: number){
        const user = this.getOne({id, delete: false}); 
        if(!user) throw new NotFoundException('User not found!')
        return await this.prisma.user.update({
            where: {id: id},
            data: {deleted: true}
        })

    }

    // Permanent Delete
    async delete( ids: number[]){
        return await this.prisma.user.deleteMany({
            where: {
                id: { in: ids}
            }
        })
    }
}
