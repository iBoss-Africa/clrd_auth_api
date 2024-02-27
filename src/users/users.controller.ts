import { Body, Controller, Delete, Get, Param, Patch, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Actions } from 'src/casl/actions.enum';
import { CanActAuthguard } from 'src/auth/guard/canact.auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Subjects } from 'src/casl/subjects.enum';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }





    // All Users
    @Get()
    @UseGuards(AuthGuard())
    @SetMetadata('action', Actions.Read)
    @SetMetadata('subject', Subjects.User)
    @UseGuards(AuthGuard(), CanActAuthguard)
    async getAll() {
        return this.usersService.getAll();
    }


    @Get(':id')
    @UseGuards(AuthGuard())
    // @SetMetadata('action', Actions.Read)
    // @UseGuards(AuthGuard(),CanActAuthguard)
    async getOne(
        @Param('id') id: string
    ): Promise<User> {
        // Convert the id to a number if necessary,
        const numericId = parseInt(id, 10);
        // Pass the id as part of an object that matches the UserWhereUniqueInput type
        return this.usersService.getOne({ id: numericId });
    }

    // View Trash
    @Get('trash/all')
    @UseGuards(AuthGuard())
    // @SetMetadata('action', Actions.Read)
    // @UseGuards(AuthGuard(),CanActAuthguard)
    async getTrash() {
        return this.usersService.viewTrash();
    }


    // Update user
    @Patch('/:id')
    // @SetMetadata('action', Actions.Create)
    @UseGuards(AuthGuard())
    async updateUser(
        @Body()
        updateUserDto: UpdateUserDto,
        @Param('id') id: string,
        @CurrentUser() user: User
    ) {
        return this.usersService.updateUser(parseInt(id), updateUserDto, user)
    }

    // soft delete a user
    @Delete('trash/:id')
    // @SetMetadata('action', Actions.Create)
    @UseGuards(AuthGuard())
    async trash(
        @Param('id') id: string,
    ) {
        return this.usersService.softDelet(parseInt(id))
    }
}
