import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProductoService } from '../servicios/producto.service';
import { ActualizarProductoDto, CrearProductoDto } from '../dto/producto.dto';
import { Roles } from 'src/auth/guards/roles.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Productos")
@Controller('productos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductoController {
    constructor(private productoService: ProductoService){}

    @ApiResponse({ status: 200, description: 'Productos existentes' })
    @Get('')
    async consultarTodos() {
        return await this.productoService.consultarTodos();
    }

    @ApiResponse({ status: 200, description: 'Producto por id' })
    @ApiResponse({ status: 400, description: 'Id de producto inválido' })
    @Get(':id')
    async consultar(@Param('id', ParseIntPipe) id: number){
        return await this.productoService.consultar(id);
    }

    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 201, description: 'Producto creado' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @Roles('ADMIN')
    @Post('')
    @UsePipes(new ValidationPipe())
    async agregar(@Body() data: CrearProductoDto){
        return await this.productoService.agregar(data);
    }

    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 200, description: 'Producto actualizado' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @Roles('ADMIN')
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async actualizar(@Param('id', ParseIntPipe) id: number, @Body() data: ActualizarProductoDto){
        return await this.productoService.actualizar(id, data);
    }

    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 200, description: 'Producto eliminado' })
    @ApiResponse({ status: 400, description: 'Id de producto inválido' })
    @Roles('ADMIN')
    @Delete(':id')
    async eliminar(@Param('id', ParseIntPipe) id: number){
        return await this.productoService.eliminar(id);
    }
}
