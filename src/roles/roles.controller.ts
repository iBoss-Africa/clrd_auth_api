import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';
import { AuthGuard } from '@nestjs/passport';
import { Actions } from 'src/casl/actions.enum';
import { CanActAuthguard } from 'src/auth/guard/canact.auth.guard';
import { Subjects } from 'src/casl/subjects.enum';

@Controller('roles')
// @UseGuards(AuthGuard(), CanActAuthguard)
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    // @SetMetadata('action', Actions.Create)
    // @SetMetadata('subject', Subjects.Role)
    create(@Body() createRoleDto: RoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    @SetMetadata('action', Actions.Read)
    @SetMetadata('subject', Subjects.Role)
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    @SetMetadata('action', Actions.Read)
    @SetMetadata('subject', Subjects.Role)
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(+id);
    }

    @Patch(':id')
    @SetMetadata('action', Actions.Update)
    @SetMetadata('subject', Subjects.Role)
    update(@Param('id') id: string, @Body() updateRoleDto: RoleDto) {
        return this.rolesService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    @SetMetadata('action', Actions.Delete)
    @SetMetadata('subject', Subjects.Role)
    remove(@Param('id') id: string) {
        return this.rolesService.remove(+id);
    }
}
