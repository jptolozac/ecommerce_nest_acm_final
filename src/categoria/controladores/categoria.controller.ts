import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriaService } from '../servicios/categoria.service';
import { ActualizarCategoriaDto, CrearCategoriaDto } from '../dto/categoria.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';

@Controller('categorias')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Categoria')
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

    @Roles('ADMIN')
    @Post('')
    @UsePipes(new ValidationPipe())
    async agregar(@Body() data: CrearCategoriaDto){
        return await this.categoriaService.agregar(data);
    }

    @Roles('ADMIN')
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async actualizar(@Param('id', ParseIntPipe) id: number, @Body() data: ActualizarCategoriaDto){
        return await this.categoriaService.actualizar(id, data);
    }

    // TODO: ON DELETE CASCADE
    @Roles('ADMIN')
    @Delete(':id')
    async eliminar(@Param('id', ParseIntPipe) id: number){
        return await this.categoriaService.eliminar(id);
    }
}
