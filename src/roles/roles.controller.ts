import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';
import { AuthGuard } from '@nestjs/passport';
import { Actions } from 'src/casl/actions.enum';
import { CanActAuthguard } from 'src/auth/guard/canact.auth.guard';
import { Subjects } from 'src/casl/subjects.enum';

@Controller('roles')
@SetMetadata('subject', Subjects.Role)
@UseGuards(AuthGuard(), CanActAuthguard)
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    @SetMetadata('action', Actions.Create)
    create(@Body() createRoleDto: RoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    @SetMetadata('action', Actions.Read)
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    @SetMetadata('action', Actions.Read)
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(+id);
    }

    @Patch(':id')
    @SetMetadata('action', Actions.Update)
    update(@Param('id') id: string, @Body() updateRoleDto: RoleDto) {
        return this.rolesService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    @SetMetadata('action', Actions.Delete)
    remove(@Param('id') id: string) {
        return this.rolesService.remove(+id);
    }
}
