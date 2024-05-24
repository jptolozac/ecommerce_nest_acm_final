import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarritoService } from '../servicios/carrito.service';
import { Roles } from 'src/auth/guards/roles.decorator';
import { CrearCarritoDto } from '../dto/carrito.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/auth/guards/user-decorator';

@Controller('carritos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CarritoController {
    constructor(private carritoService: CarritoService) {}

    @Get('')
    async consultarTodos() {
        return await this.carritoService.consultarTodos();
    }

    @Get(':id')
    async consultar(@Param('id', ParseIntPipe) id: number){
        return await this.carritoService.consultar(id);
    }

    // @Roles('ADMIN')
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

    @Roles('ADMIN')
    @Delete(':id')
    async eliminar(@Param('id', ParseIntPipe) id: number){
        return await this.carritoService.eliminar(id);
    }
}
