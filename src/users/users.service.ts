import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, Redirect, UnauthorizedException, } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserSignUpDto } from 'src/users/dto/userSignup.dto';
import * as bcrypt from 'bcryptjs';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import Email from '../utils/email'
import { Request } from 'express';
import APIFeatures from 'src/utils/apiFeatures.utils';



@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        // private roles: RolesService
    ) { }


    // get a single user
    async getOne(criteria: any): Promise<User> {
        return this.prisma.user.findUnique({
            where: { ...criteria, deleted: false }
        });
    }

    async view(criteria: any): Promise<User> { 
        const user = await this.getOne(criteria);
        if (!user) throw new NotFoundException('User not found!');
        return this.sanitizeUser(user);
    }

    async getUserRole(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id: id },
            include: { role: true }
        });
        if (!user) throw new NotFoundException('User not found!');
        return user;
    }

    // fetch all users
    async getAll() {
        const users = (await this.prisma.user.findMany({ where: { deleted: false } }));
        return users.map(user => this.sanitizeUser(user));
    }

    // Signup users
    async Signup(userSignUpDto: UserSignUpDto): Promise<User> {
        const { email, phone, password } = userSignUpDto;
        const user = await this.getOne({ email });

        if (user) { throw new ConflictException('Email already exist!'); }

        const salt = 10
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await this.prisma.user.create({
            data: {
                ...userSignUpDto,
                password: hashPassword
            }
        });
        return this.sanitizeUser(newUser);
    }

    // Verify Email
    async verifyEmail( verifyEmailDto: VerifyEmailDto, protocol: string, host: string){
        const { email } = verifyEmailDto;
        const user = await this.getOne({email});
        if(!user) throw new NotFoundException('Not Found!');
        
        // Generate token
        const otp = await APIFeatures.generateOtp();

        await this.prisma.user.update({where:{
            email: email
        }, data: {
            token: otp.token,
            expiresIn: otp.otpExpires
        }
    })

    const verifyLink = `${protocol}://${host}/v1/api/users/activate`;
    try{
        await Email.verifyEmail(user.email, user.firstName, verifyLink, otp.token);
        return 'Email sent Successfully.'

    }catch(error){
        if(error){
            return 'Email not sent!'
        }
    }

    }

    async activateEmail(body: {token: number}, user: User){
        const currentTime = new Date();
        const verifyToken  = await this.prisma.user.findFirst({
            where: {
                token: body.token, 
                expiresIn: {
                    gte: new Date(currentTime.getTime()),
                }
            }
        });

        if(!verifyToken){throw new BadRequestException('Token not found or expired'); }

        if(user.token !== body.token){
            return new BadRequestException('Invalid token')
        }else{
            return await this.prisma.user.update({
                where: {id: user.id},
                data:{
                    token: null,
                    expiresIn: null,
                    status:'ACTIVE'
                }
            })
        }


    }

    // View Trash
    async viewTrash() {
        const users = await this.prisma.user.findMany({ where: { deleted: true } });
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
            throw new UnauthorizedException('you are not allowed!');
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
    async restoreUser(id: number) {
        this.getOne({ id });

        return await this.prisma.user.update({
            where: { id: id },
            data: { deleted: false }
        })
    }

    // Delete User
    async softDelete(id: number) {
        const user = this.getOne({ id, delete: false });
        if (!user) throw new NotFoundException('User not found!')
        return await this.prisma.user.update({
            where: { id: id },
            data: { deleted: true }
        })

    }

    // Permanent Delete
    async delete(ids: number[]) {
        return await this.prisma.user.deleteMany({
            where: {
                id: { in: ids }
            }
        })
    }

    sanitizeUser(user) {
        const { password, deleted, ...sanitizedUser } = user;
        return sanitizedUser;
    }
}
