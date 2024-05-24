import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ActualizarRolDto, CrearRolDto } from 'src/usuario/dto/rol.dto';
import { RolService } from 'src/usuario/servicios/rol/rol.service';

@Controller('rol')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("Rol")
export class RolController {
    constructor(private rolService: RolService){}

    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 201, description: 'Rol creado' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @Roles('ADMIN')
    @Post('crearRol')
    @UsePipes(new ValidationPipe())
    async crearRol(@Body() data: CrearRolDto){
        return await this.rolService.crearRol(data);
    }

    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 200, description: 'Roles existentes' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @Roles('ADMIN')
    @Get('consultarRoles')
    async consultarRoles(){
        return await this.rolService.consultarTodos();
    }

    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 200, description: 'Rol por id' })
    @ApiResponse({ status: 400, description: 'Rol inválido' })
    @Roles('ADMIN')
    @Get('consultarRol/:id')
    async consultarRol(@Param('id', ParseIntPipe) id: number){
        return await this.rolService.consultarPorId(id);
    }

    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 200, description: 'Rol actualizado' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @Roles('ADMIN')
    @Put('actualizarRol/:id')
    @UsePipes(new ValidationPipe())
    async actualizarRol(@Param('id', ParseIntPipe) id: number, @Body() data: ActualizarRolDto){
        return await this.rolService.actualizarRol(id, data);
    }

    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 200, description: 'Rol eliminado' })
    @ApiResponse({ status: 400, description: 'Rol inválido' })
    @Roles('ADMIN')
    @Delete('eliminarRol/:id')
    @UsePipes(new ValidationPipe())
    async eliminarRol(@Param('id', ParseIntPipe) id: number){
        return await this.rolService.eliminarUsuario(id);
    }
}
