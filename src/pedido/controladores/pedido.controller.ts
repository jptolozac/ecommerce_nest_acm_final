import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PedidoService } from '../servicios/pedido.service';
import { Roles } from 'src/auth/guards/roles.decorator';
import { ActualizarPedidoDto, CrearPedidoDto } from '../dto/pedido.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('pedidos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PedidoController {
    constructor(private pedidoService: PedidoService) {}

    @Get('')
    async consultarTodos() {
        return await this.pedidoService.consultarTodos();
    }

    @Get(':id')
    async consultar(@Param('id', ParseIntPipe) id: number){
        return await this.pedidoService.consultar(id);
    }

    // @Roles('ADMIN')
    @Post('')
    @UsePipes(new ValidationPipe())
    async agregar(@Body() data: CrearPedidoDto){
        return await this.pedidoService.agregar(data);
    }

    // @Roles('ADMIN')
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async actualizar(@Param('id', ParseIntPipe) id: number, @Body() data: ActualizarPedidoDto){
        return await this.pedidoService.actualizar(id, data);
    }

    @Roles('ADMIN')
    @Delete(':id')
    async eliminar(@Param('id', ParseIntPipe) id: number){
        return await this.pedidoService.eliminar(id);
    }

}
