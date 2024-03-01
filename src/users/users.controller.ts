import { Body, Controller, Delete, Get, Param, Patch, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Actions } from 'src/casl/actions.enum';
import { Subjects } from 'src/casl/subjects.enum';
import { CanActAuthguard } from 'src/auth/guard/canact.auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserSignUpDto } from 'src/users/dto/userSignup.dto';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    // All Users
    @Get()
    @SetMetadata('action', Actions.Read)
    @SetMetadata('subject', Subjects.User)
    @UseGuards(AuthGuard(),CanActAuthguard)
    async getAll(){
        return this.usersService.getAll();
    }

    @Get(':id')
    @SetMetadata('action', Actions.Read)
    @SetMetadata('subject', Subjects.User)
    @UseGuards(AuthGuard(),CanActAuthguard)
    async getOne(
        @Param('id')id: string
    ){
        const numericId = parseInt(id,  10);
        return this.usersService.getOne({ id: numericId });
    }

    // New user
    @Post('/')
    async create(
        @Body() userSignUpDto:UserSignUpDto,
    ): Promise<{}>{
        return this.usersService.Signup(userSignUpDto);
    }

    // View Trash
    @Get('trash/all')
    @SetMetadata('action', Actions.Manage)
    @SetMetadata('subject', Subjects.User)
    @UseGuards(AuthGuard(),CanActAuthguard)
    async getTrash(){
        return this.usersService.viewTrash();
    }

    // Update user
    @Patch('/:id')
    @SetMetadata('action', Actions.Create)
    @SetMetadata('subject', Subjects.User)
    @UseGuards(AuthGuard(),CanActAuthguard)
    async updateUser(
        @Body()
        updateUserDto: UpdateUserDto,
        @Param('id') id: string,
        @CurrentUser() user: User
    ) {
        return this.usersService.updateUser(parseInt(id), updateUserDto, user)
    }

     // restore deleted a user
    @Put('restore/:id')
    @SetMetadata('action', Actions.Manage)
    @SetMetadata('subject', Subjects.User)
    @UseGuards(AuthGuard(),CanActAuthguard)
     async restore(
         @Param('id')id: string,
     ){
         return this.usersService.restoreUser(parseInt(id))
     }

    // soft delete a user
    @Delete('trash/:id')
    @SetMetadata('action', Actions.Manage)
    @SetMetadata('subject', Subjects.User)
    @UseGuards(AuthGuard(),CanActAuthguard)
    async trash(
        @Param('id') id: string,
    ) {
        return this.usersService.softDelet(parseInt(id))
    }
}
