import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriaService } from '../servicios/categoria.service';
import { ActualizarCategoriaDto, CrearCategoriaDto } from '../dto/categoria.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('categorias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriaController {
    constructor(private categoriaService: CategoriaService){}

    @Get('')
    async consultarTodos() {
        return await this.categoriaService.consultarTodas();
    }

    @Get(':id')
    async consultar(@Param('id', ParseIntPipe) categoriaId: number){
        return await this.categoriaService.consultar(categoriaId);
    }

    @Post('')
    @UsePipes(new ValidationPipe())
    async agregar(@Body() data: CrearCategoriaDto){
        return await this.categoriaService.agregar(data);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async actualizar(@Param('id', ParseIntPipe) id: number, @Body() data: ActualizarCategoriaDto){
        return await this.categoriaService.actualizar(id, data);
    }

    @Delete(':id')
    async eliminar(@Param('id', ParseIntPipe) id: number){
        return await this.categoriaService.eliminar(id);
    }
}
