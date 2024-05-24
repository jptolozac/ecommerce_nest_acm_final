import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarritoService } from '../servicios/carrito.service';
import { Roles } from 'src/auth/guards/roles.decorator';
import { CrearCarritoDto } from '../dto/carrito.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/auth/guards/user-decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Carritos")
@Controller('carritos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CarritoController {
    constructor(private carritoService: CarritoService) {}

    @ApiOperation({ summary: "Admin" })
    @ApiResponse({ status: 200, description: 'Carritos existentes' })
    @Roles("ADMIN")
    @Get('')
    async consultarTodos() {
        return await this.carritoService.consultarTodos();
    }

    @ApiResponse({ status: 200, description: 'Carrito activo del usuario propietario del ticket' })
    @ApiResponse({ status: 400, description: 'No hay carritos activos para el usuario' })
    @Get('usuario')
    async consultar(@User() user){
        return await this.carritoService.consultar(user.userId);
    }

    // @Roles('ADMIN')
    @ApiResponse({ status: 201, description: 'Productos añadidos a carrito existente o creado del usuario propietario del token' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiBody({ type: CrearCarritoDto })
    @Post('')
    @UsePipes(new ValidationPipe())
    async agregar(@User() user, @Body() data: CrearCarritoDto){
        return await this.carritoService.agregar(user.userId, data);
    }

    // @Roles('ADMIN')
    // @Put(':id')
    // @UsePipes(new ValidationPipe())
    // async actualizar(@Param('id', ParseIntPipe) id: number, @Body() data: ActualizarCarritoDto){
    //     return await this.carritoService.actualizar(id, data);
    // }

    // TODO: ON DELETE CASCADE
    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 200, description: 'Carrito eliminado' })
    @ApiResponse({ status: 400, description: 'Id de carrito inválido' })
    @Roles('ADMIN')
    @Delete(':id')
    async eliminar(@Param('id', ParseIntPipe) id: number){
        return await this.carritoService.eliminar(id);
    }
}
