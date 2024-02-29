import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CanActAuthguard } from 'src/auth/guard/canact.auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Actions } from 'src/casl/actions.enum';
import { Subjects } from 'src/casl/subjects.enum';

@Controller('permissions')
@UseGuards(AuthGuard(), CanActAuthguard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post()
  @SetMetadata('action', Actions.Create)
  @SetMetadata('subject', Subjects.Permission)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @SetMetadata('action', Actions.Read)
  @SetMetadata('subject', Subjects.Permission)
  findAll() {
    return this.permissionsService.findAll({});
  }

  @Get(':id')
  @SetMetadata('action', Actions.Read)
  @SetMetadata('subject', Subjects.Permission)
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  @SetMetadata('action', Actions.Update)
  @SetMetadata('subject', Subjects.Permission)
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @SetMetadata('action', Actions.Delete)
  @SetMetadata('subject', Subjects.Permission)
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
