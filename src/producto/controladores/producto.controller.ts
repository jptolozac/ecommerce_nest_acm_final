import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProductoService } from '../servicios/producto.service';
import { ActualizarProductoDto, CrearProductoDto } from '../dto/producto.dto';
import { Roles } from 'src/auth/guards/roles.decorator';

@Controller('productos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductoController {
    constructor(private productoService: ProductoService){}

    @Get('')
    async consultarTodos() {
        return await this.productoService.consultarTodos();
    }

    @Get(':id')
    async consultar(@Param('id', ParseIntPipe) id: number){
        return await this.productoService.consultar(id);
    }

    @Roles('ADMIN')
    @Post('')
    @UsePipes(new ValidationPipe())
    async agregar(@Body() data: CrearProductoDto){
        return await this.productoService.agregar(data);
    }

    @Roles('ADMIN')
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async actualizar(@Param('id', ParseIntPipe) id: number, @Body() data: ActualizarProductoDto){
        return await this.productoService.actualizar(id, data);
    }

    @Roles('ADMIN')
    @Delete(':id')
    async eliminar(@Param('id', ParseIntPipe) id: number){
        return await this.productoService.eliminar(id);
    }
}
