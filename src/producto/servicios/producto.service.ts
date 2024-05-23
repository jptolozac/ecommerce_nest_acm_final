import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Producto } from '../entidades/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { errorResponse, successResponse } from 'src/responses/response';
import { ActualizarProductoDto, CrearProductoDto } from '../dto/producto.dto';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto)
        private productoRepo: Repository<Producto>
    ) {}

    async consultarTodos(){
        const response = await this.productoRepo.find({ relations: ["categoria"] });
        return successResponse(response)
    }

    async consultar(id: number){
        const producto = await this.productoRepo.findOne({ where: [{ id }]})
        if(!producto) return errorResponse("Producto no encontrado", 400)
        return successResponse(producto)
    }

    async agregar(data: CrearProductoDto){
        try {
            const producto = await this.productoRepo.findOne({ where: [{ nombre: data.nombre }] })
            if(producto)
                return errorResponse("La producto ya está creado", 400)
            const nuevaproducto = this.productoRepo.create(data)
            
            return successResponse(await this.productoRepo.save(nuevaproducto), 201)
        } catch (error) {
            console.log(error);
            return errorResponse("Error interno")
        }
    }

    async actualizar(id: number, data: ActualizarProductoDto){
        try {
            let producto = await this.productoRepo.findOne({ where: [{ id }] })
            if(!producto) return errorResponse("Producto no encontrado", 400)
            producto = this.productoRepo.merge(producto, data)

            return successResponse(await this.productoRepo.save(producto))
        } catch (error) {
            // console.log(error);
            return errorResponse("Error interno")
        }
    }

    async eliminar(id: number){
        try {
            const producto = await this.productoRepo.findOne({ where: [{ id }] })
            if(!producto) return errorResponse("Producto no encontrado", 400)
            await this.productoRepo.delete(producto)

            return successResponse("Producto eliminado", 202)
        } catch (error) {
            return errorResponse("Error interno")
        }
    }
}
