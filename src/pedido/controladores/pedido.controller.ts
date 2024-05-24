import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PedidoService } from '../servicios/pedido.service';
import { Roles } from 'src/auth/guards/roles.decorator';
import { ActualizarPedidoDto, CrearPedidoDto } from '../dto/pedido.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/auth/guards/user-decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Pedidos")
@Controller('pedidos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PedidoController {
    constructor(private pedidoService: PedidoService) {}

    @ApiResponse({ status: 200, description: 'Pedidos existentes' })
    @Get('')
    async consultarTodos() {
        return await this.pedidoService.consultarTodos();
    }

    @ApiResponse({ status: 200, description: 'Pedido por id' })
    @ApiResponse({ status: 400, description: 'Id de pedido inválido' })
    @Get(':id')
    async consultar(@Param('id', ParseIntPipe) id: number){
        return await this.pedidoService.consultar(id);
    }

    @ApiResponse({ status: 200, description: 'Pedido pendiente completado por el usuario propietario del token retornando todos los datos de facturación' })
    @ApiResponse({ status: 400, description: 'El usuario propietario del token no posee pedidos pendientes' })
    @Get('carrito/realizarPedido')
    @UsePipes(new ValidationPipe())
    async realizarPedido(@User() user){
        console.log(user);
        return await this.pedidoService.realizarPedido(user.userId)
        // return await this.carritoService.realizarPedido(user);
    }

    // @Roles('ADMIN')
    @ApiResponse({ status: 201, description: 'Pedido creado' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @Post('')
    @UsePipes(new ValidationPipe())
    async agregar(@Body() data: CrearPedidoDto){
        return await this.pedidoService.agregar(data);
    }

    // @Roles('ADMIN')
    @ApiResponse({ status: 201, description: 'Pedido creado' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async actualizar(@Param('id', ParseIntPipe) id: number, @Body() data: ActualizarPedidoDto){
        return await this.pedidoService.actualizar(id, data);
    }

    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 200, description: 'Pedido eliminado' })
    @ApiResponse({ status: 400, description: 'Id de pedido inválido' })
    @Roles('ADMIN')
    @Delete(':id')
    async eliminar(@Param('id', ParseIntPipe) id: number){
        return await this.pedidoService.eliminar(id);
    }

}
