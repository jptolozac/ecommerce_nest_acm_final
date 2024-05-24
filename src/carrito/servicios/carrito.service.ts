import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Carrito } from '../entidades/carrito.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { errorResponse, successResponse } from 'src/responses/response';
import { CrearCarritoDto } from '../dto/carrito.dto';
import { UsuarioService } from 'src/usuario/servicios/usuario.service';
import { PedidoService } from 'src/pedido/servicios/pedido.service';
import { CarritoProductoService } from './carrito-producto.service';

@Injectable()
export class CarritoService {
    constructor(
        @InjectRepository(Carrito)
        private carritoRepo: Repository<Carrito>,
        private usuarioService: UsuarioService,
        private pedidoService: PedidoService,
        private carritoProductoService: CarritoProductoService
    ) { }

    async consultarTodos() {
        const response = await this.carritoRepo.find({ relations: ["usuario", "carritoProductos", "carritoProductos.producto", "pedido"] });
        return successResponse(response)
    }

    async consultar(id: number) {
        const carrito = await this.carritoRepo.findOne({ where: [{ id }], relations: ["usuario", "carritoProductos", "carritoProductos.producto", "pedido"] })
        if (!carrito) return errorResponse("Carrito no encontrado", 400)
        return successResponse(carrito)
    }

    async crear(data: CrearCarritoDto) {
        try {
            const { cedula_usuario, productos, ...carrito } = data;
            const usuario = await this.usuarioService.consultarUsuario(cedula_usuario)
            if (!usuario)
                return errorResponse("Usuario no encontrado", 400)

            let pedidoActivo = (await this.pedidoService.consultarPorUsuario(usuario.id))
            console.log(pedidoActivo);
            
            let carritoActivo: Carrito = null
            if (pedidoActivo.error) {
                pedidoActivo = await this.pedidoService.agregar({
                    cedula_usuario,
                    estado: "pendiente",
                    fecha_creacion: new Date(this.currentDate()),
                    total: 0
                })

                if (pedidoActivo.error)
                    throw new Error("Error al crear el pedido")

                const carritoPlantilla = this.carritoRepo.create({
                    pedido: pedidoActivo.response,
                    usuario,
                    ...carrito
                })
                carritoActivo = await this.carritoRepo.save(carritoPlantilla)
                carritoActivo.pedido = pedidoActivo.response;
            }else{
                carritoActivo = await this.carritoRepo.findOne({ where: { pedido: [{ id: pedidoActivo.response.id }] } })
                if(!carritoActivo) {
                    console.log(carritoActivo);
                    return errorResponse("Error al obtener el carrito")
                }
            }

            const pedido = pedidoActivo.response

            let totalParcial = 0
            for (const producto of productos) {
                const carritoProducto = await this.carritoProductoService.agregar(producto, carritoActivo)
                if (carritoProducto.response && typeof carritoProducto.response === 'number')
                    totalParcial += carritoProducto.response as number
            }
            pedido.total = totalParcial
            this.pedidoService.actualizar(pedido.id, pedido)

            return successResponse("Productos añadidos al carrito", 201)
        } catch (error) {
            console.log(error);
            return errorResponse("Error interno")
        }
    }

    async agregar(carritoId: number, data: CrearCarritoDto) {
        try {
            const { cedula_usuario, productos } = data;
            const usuario = await this.usuarioService.consultarUsuario(cedula_usuario)
            if (!usuario)
                return errorResponse("Usuario no encontrado", 400)

            const carrito = await this.carritoRepo.findOne({ where: { id: carritoId }, relations: ["pedido"] })
            if (!carrito) return errorResponse("Carrito no encontrado", 400)

            let totalParcial: number = 0
            for (const producto of productos) {
                const carritoProducto = await this.carritoProductoService.agregar(producto, carrito)
                if (carritoProducto.response && typeof carritoProducto.response === 'number')
                    totalParcial += carritoProducto.response as number
            }

            const pedido = carrito.pedido
            totalParcial += Number(pedido.total)
            pedido.total = totalParcial
            this.pedidoService.actualizar(pedido.id, pedido)

            return successResponse("Productos añadidos al carrito", 201)
        } catch (error) {
            console.log(error);
            return errorResponse("Error interno")
        }
    }

    // async actualizar(id: number, data: ActualizarCarritoDto){
    //     try {
    //         let carrito = await this.carritoRepo.findOne({ where: [{ id }] })
    //         if(!carrito) return errorResponse("Carrito no encontrado", 400)
    //         carrito = this.carritoRepo.merge(carrito, data)

    //         return successResponse(await this.carritoRepo.save(carrito))
    //     } catch (error) {
    //         // console.log(error);
    //         return errorResponse("Error interno")
    //     }
    // }

    async eliminar(id: number) {
        try {
            const carrito = await this.carritoRepo.findOne({ where: [{ id }] })
            if (!carrito) return errorResponse("Carrito no encontrado", 400)
            await this.carritoRepo.delete(carrito)

            return successResponse("Carrito eliminado", 202)
        } catch (error) {
            return errorResponse("Error interno")
        }
    }

    currentDate(): string {
        const current = new Date();
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, '0');
        const day = String(current.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}
