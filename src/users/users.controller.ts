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

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}


    @Get()
    @SetMetadata('action', Actions.Read)
    @SetMetadata('subject', Subjects.User)
    @UseGuards(AuthGuard(),CanActAuthguard)
    async getAll(){
        return this.usersService.getAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard(),CanActAuthguard)
    @SetMetadata('action', Actions.Read)
    @SetMetadata('subject', Subjects.User)
    async getOne(
        @Param('id')id: string
    ){
        const numericId = parseInt(id,  10);
        return this.usersService.getOne({ id: numericId });
    }

    @Get(':id/role')
    @UseGuards(AuthGuard(),CanActAuthguard)
    @SetMetadata('action', Actions.Read)
    @SetMetadata('subject', Subjects.User)
    async userRole(
        @Param('id')id: string
    ){
        return this.usersService.getUserRole(parseInt(id));
    }


    @Post('/')
    async create(
        @Body() userSignUpDto:UserSignUpDto,
    ): Promise<{}>{
        return this.usersService.Signup(userSignUpDto);
    }


    @Patch('/:id')
    // @SetMetadata('action', Actions.Update)
    // @SetMetadata('subject', Subjects.User)
    @UseGuards(AuthGuard())
    async updateUser(
        @Body()
        updateUserDto: UpdateUserDto,
        @Param('id') id: string,
        @CurrentUser() user: User
    ) {
        return this.usersService.updateUser(parseInt(id), updateUserDto, user)
    }

    // View Trash
    @Get('trash/all')
    @SetMetadata('action', Actions.Manage)
    @SetMetadata('subject', Subjects.User)
    @UseGuards(AuthGuard(),CanActAuthguard)
    async getTrash(){
        return this.usersService.viewTrash();
    }

     // restore deleted a user
    @Put('restore/:id')
    @UseGuards(AuthGuard(),CanActAuthguard)
    @SetMetadata('action', Actions.Manage)
    @SetMetadata('subject', Subjects.User)
     async restore(
         @Param('id')id: string,
     ){
         return this.usersService.restoreUser(parseInt(id))
     }

    // soft delete a user
    @Delete('trash/:id')
    @UseGuards(AuthGuard(),CanActAuthguard)
    @SetMetadata('action', Actions.Delete)
    @SetMetadata('subject', Subjects.User)
    async trash(
        @Param('id') id: string,
    ) {
        return this.usersService.softDelete(parseInt(id))
    }

    // Permanent Delete
    @Delete('delete')
    @UseGuards(AuthGuard(),CanActAuthguard)
    @SetMetadata('action', Actions.Manage)
    @SetMetadata('subject', Subjects.User)
    async Delete(
        @Body() requestBody: any,
    ) {
        return this.usersService.delete(requestBody.ids)
    }
}
