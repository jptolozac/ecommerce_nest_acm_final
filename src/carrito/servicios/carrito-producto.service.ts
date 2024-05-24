import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CarritoProducto } from '../entidades/carritoProducto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { errorResponse, successResponse } from 'src/responses/response';
import { ActualizarCarritoProductoDto, CrearCarritoProductoDto } from '../dto/carritoProducto.dto';
import { ProductoService } from 'src/producto/servicios/producto.service';
import { Carrito } from '../entidades/carrito.entity';
import { Producto } from 'src/producto/entidades/producto.entity';

@Injectable()
export class CarritoProductoService {
    constructor(
        @InjectRepository(CarritoProducto)
        private carritoProductoRepo: Repository<CarritoProducto>,
        @Inject(forwardRef(() => ProductoService))
        private productoService: ProductoService,
    ) { }

    async consultarTodos() {
        const response = await this.carritoProductoRepo.find({ relations: ["usuario"] });
        return successResponse(response)
    }

    async consultar(id: number) {
        const carritoProducto = await this.carritoProductoRepo.findOne({ where: [{ id }], relations: ["usuario"] })
        if (!carritoProducto) return errorResponse("Pedido no encontrado", 400)
        return successResponse(carritoProducto)
    }

    async consultarPorCarrito(carritoId: number) {
        const productos = await this.carritoProductoRepo.find({ where: [{ carrito: [{ id: carritoId }] }], relations: ["producto"] })
        return productos;
    }

    async agregar(data: CrearCarritoProductoDto, carrito: Carrito) {
        try {
            const { producto_id, cantidad, ...carritoProducto } = data;
            const getProducto = (await this.productoService.consultar(producto_id))
            if (getProducto.error) return errorResponse("Producto no encontrado", 400)
            const producto: Producto = getProducto.response
            if (!carrito) return errorResponse("Carrito no encontrado")

            const nuevoProductoCarrito = this.carritoProductoRepo.create({
                ...carritoProducto,
                cantidad,
                producto,
                carrito: {
                    id: carrito.id
                }
            })

            await this.carritoProductoRepo.save(nuevoProductoCarrito)

            return successResponse(producto.precio * cantidad);
            // return successResponse(await this.carritoProductoRepo.save(nuevoProductoCarrito), 201)
        } catch (error) {
            console.log(error);
            return errorResponse("Error interno")
        }
    }

    async actualizar(id: number, data: ActualizarCarritoProductoDto) {
        try {
            let carritoProducto = await this.carritoProductoRepo.findOne({ where: [{ id }] })
            if (!carritoProducto) return errorResponse("Pedido no encontrado", 400)
            carritoProducto = this.carritoProductoRepo.merge(carritoProducto, data)

            return successResponse(await this.carritoProductoRepo.save(carritoProducto))
        } catch (error) {
            // console.log(error);
            return errorResponse("Error interno")
        }
    }

    async eliminar(id: number) {
        try {
            const carritoProducto = await this.carritoProductoRepo.findOne({ where: [{ id }] })
            if (!carritoProducto) return errorResponse("Pedido no encontrado", 400)
            await this.carritoProductoRepo.delete(carritoProducto)

            return successResponse("Pedido eliminado", 202)
        } catch (error) {
            return errorResponse("Error interno")
        }
    }
}
