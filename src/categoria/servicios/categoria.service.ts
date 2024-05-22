import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categoria } from '../entidades/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { errorResponse, successResponse } from 'src/responses/response';
import { ActualizarCategoriaDto, CrearCategoriaDto } from '../dto/categoria.dto';

@Injectable()
export class CategoriaService {
    constructor(@InjectRepository(Categoria) private categoriaRepo: Repository<Categoria>) {}

    async consultarTodas(){
        const response = await this.categoriaRepo.find();
        return successResponse(response)
    }

    async consultar(id: number){
        const categoria = await this.categoriaRepo.findOne({ where: [{ id }]})
        if(!categoria) return errorResponse("Categoría no encontrada", 400)
        return successResponse(categoria)
    }

    async agregar(data: CrearCategoriaDto){
        try {
            const categoria = await this.categoriaRepo.findOne({ where: [{ nombre: data.nombre }] })
            if(categoria)
                return errorResponse("La categoría ya está creada", 400)
            const nuevaCategoria = this.categoriaRepo.create(data)
            
            return successResponse(await this.categoriaRepo.save(nuevaCategoria), 201)
        } catch (error) {
            return errorResponse("Error interno")
        }
    }

    async actualizar(id: number, data: ActualizarCategoriaDto){
        try {
            let categoria = await this.categoriaRepo.findOne({ where: [{ id }] })
            if(!categoria) return errorResponse("Categoria no encontrada", 400)
            categoria = this.categoriaRepo.merge(categoria, data)

            return successResponse(await this.categoriaRepo.save(categoria))
        } catch (error) {
            return errorResponse("Error interno")
        }
    }

    async eliminar(id: number){
        try {
            const categoria = await this.categoriaRepo.findOne({ where: [{ id }] })
            if(!categoria) return errorResponse("Categoria no encontrada", 400)
            await this.categoriaRepo.delete(categoria)

            return successResponse("Categoría eliminada", 202)
        } catch (error) {
            return errorResponse("Error interno")
        }
    }
}
