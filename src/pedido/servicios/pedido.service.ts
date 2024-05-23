import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pedido } from '../entidades/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { errorResponse, successResponse } from 'src/responses/response';
import { ActualizarPedidoDto, CrearPedidoDto } from '../dto/pedido.dto';
import { UsuarioService } from 'src/usuario/servicios/usuario.service';

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(Pedido)
        private pedidoRepo: Repository<Pedido>,
        private usuarioService: UsuarioService
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

    async agregar(data: CrearPedidoDto){
        try {
            const {cedula_usuario, ...pedido} = data;
            const usuario = await this.usuarioService.consultarUsuario(cedula_usuario)
            if(!usuario)
                return errorResponse("Usuario no encontrado", 400)

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
            pedido = this.pedidoRepo.merge(pedido, data)

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
