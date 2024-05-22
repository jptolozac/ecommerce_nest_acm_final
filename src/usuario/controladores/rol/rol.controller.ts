import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActualizarRolDto, CrearRolDto } from 'src/usuario/dto/rol.dto';
import { RolService } from 'src/usuario/servicios/rol/rol.service';

@Controller('rol')
@ApiTags("Rol")
export class RolController {
    constructor(private rolService: RolService){}

    @Post('crearRol')
    @UsePipes(new ValidationPipe())
    async crearRol(@Body() data: CrearRolDto){
        return await this.rolService.crearRol(data);
    }

    @Get('consultarRoles')
    async consultarRoles(){
        return await this.rolService.consultarTodos();
    }

    @Get('consultarRol/:id')
    async consultarRol(@Param('id', ParseIntPipe) id: number){
        return await this.rolService.consultarPorId(id);
    }

    @Put('actualizarRol/:id')
    @UsePipes(new ValidationPipe())
    async actualizarRol(@Param('id', ParseIntPipe) id: number, @Body() data: ActualizarRolDto){
        return await this.rolService.actualizarRol(id, data);
    }

    @Delete('eliminarRol/:id')
    @UsePipes(new ValidationPipe())
    async eliminarRol(@Param('id', ParseIntPipe) id: number){
        return await this.rolService.eliminarUsuario(id);
    }
}
