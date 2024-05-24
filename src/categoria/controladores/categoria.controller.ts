import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriaService } from '../servicios/categoria.service';
import { ActualizarCategoriaDto, CrearCategoriaDto } from '../dto/categoria.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';

@Controller('categorias')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Categoria')
export class CategoriaController {
    constructor(private categoriaService: CategoriaService){}

    @ApiResponse({ status: 200, description: 'Categorias existentes' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @Get('')
    async consultarTodos() {
        return await this.categoriaService.consultarTodas();
    }

    @ApiResponse({ status: 200, description: 'Categoria por id' })
    @ApiResponse({ status: 400, description: 'Id de categoria inválido' })
    @Get(':id')
    async consultar(@Param('id', ParseIntPipe) categoriaId: number){
        return await this.categoriaService.consultar(categoriaId);
    }

    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 201, description: 'Categoria creada' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @Roles('ADMIN')
    @Post('')
    @UsePipes(new ValidationPipe())
    async agregar(@Body() data: CrearCategoriaDto){
        return await this.categoriaService.agregar(data);
    }

    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 200, description: 'Categoria actualizada' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @Roles('ADMIN')
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async actualizar(@Param('id', ParseIntPipe) id: number, @Body() data: ActualizarCategoriaDto){
        return await this.categoriaService.actualizar(id, data);
    }

    // TODO: ON DELETE CASCADE
    @ApiOperation({ summary: 'Admin' })
    @ApiResponse({ status: 200, description: 'Categoria eliminada' })
    @ApiResponse({ status: 400, description: 'Id de categoría inválida' })
    @Roles('ADMIN')
    @Delete(':id')
    async eliminar(@Param('id', ParseIntPipe) id: number){
        return await this.categoriaService.eliminar(id);
    }
}
