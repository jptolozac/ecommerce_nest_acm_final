import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pedido } from '../entidades/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { errorResponse, successResponse } from 'src/responses/response';
import { ActualizarPedidoDto, CrearPedidoDto } from '../dto/pedido.dto';
import { UsuarioService } from 'src/usuario/servicios/usuario.service';
import { CarritoProductoService } from 'src/carrito/servicios/carrito-producto.service';

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(Pedido)
        private pedidoRepo: Repository<Pedido>,
        private usuarioService: UsuarioService,
        @Inject(forwardRef(() => CarritoProductoService))
        private carritoProductoService: CarritoProductoService
    ) {}

    async consultarTodos(){
        const response = await this.pedidoRepo.find({ relations: ["usuario"] });
        return successResponse(response)
    }

    async consultar(id: number){
        const pedido = await this.pedidoRepo.findOne({ where: [{ id }], relations: ["usuario"]})
        if(!pedido) return errorResponse("Pedido no encontrado", 400)
        return successResponse(pedido)
    }

    async consultarPorUsuario(usuarioId: number){
        const pedido = await this.pedidoRepo.findOne({ where: [{ usuario: [{ id: usuarioId }], estado: "pendiente" }] })
        if(!pedido) return errorResponse("Pedido no encontrado", 400)
        return successResponse(pedido)
    }

    async realizarPedido(cedula_usuario: string){
        let pedido = await this.pedidoRepo.findOne({ where: [{ usuario: [{ cedula: cedula_usuario }], estado: "pendiente" }], relations: ["usuario", "carrito"] })
        if(!pedido) 
            return errorResponse("No hay pedidos activos para el usuario", 400)
        pedido.estado = "completado"
        pedido = await this.pedidoRepo.save(pedido)
        const carritoProductos = await this.carritoProductoService.consultarPorCarrito(pedido.carrito.id)
        
        return successResponse({
            ...pedido,
            productos: carritoProductos
        })
    }

    async agregar(data: CrearPedidoDto){
        try {
            const {cedula_usuario, ...pedido} = data;
            const usuario = await this.usuarioService.consultarUsuario(cedula_usuario)
            if(!usuario)
                return errorResponse("Pedido no encontrado", 400)

            const nuevoProducto = this.pedidoRepo.create({
                ...pedido,
                usuario
            })
            
            return successResponse(await this.pedidoRepo.save(nuevoProducto), 201)
        } catch (error) {
            console.log(error);
            return errorResponse("Error interno")
        }
    }

    async actualizar(id: number, data: ActualizarPedidoDto){
        try {
            let pedido = await this.pedidoRepo.findOne({ where: [{ id }] })
            if(!pedido) return errorResponse("Pedido no encontrado", 400)
            pedido = this.pedidoRepo.merge(pedido, {...data, carrito: { id: data.carrito_id }})

            return successResponse(await this.pedidoRepo.save(pedido))
        } catch (error) {
            // console.log(error);
            return errorResponse("Error interno")
        }
    }

    async eliminar(id: number){
        try {
            const pedido = await this.pedidoRepo.findOne({ where: [{ id }] })
            if(!pedido) return errorResponse("Pedido no encontrado", 400)
            await this.pedidoRepo.delete(pedido)

            return successResponse("Pedido eliminado", 202)
        } catch (error) {
            return errorResponse("Error interno")
        }
    }
}
