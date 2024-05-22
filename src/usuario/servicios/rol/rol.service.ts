import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActualizarRolDto, CrearRolDto } from 'src/usuario/dto/rol.dto';
import { Rol } from 'src/usuario/entidades/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(Rol)
        private rolRepo: Repository<Rol>
    ) { }

    async crearRol(data: CrearRolDto) {
        try {
            const rol = await this.rolRepo.find({ where: [{ nombre: data.nombre }] });

            if (rol.length > 0) {
                return {
                    statusCode: 200,
                    message: 'El rol ya esta creado'
                }
            }

            const nuevoRol = this.rolRepo.create(data);
            return {
                statusCode: 201,
                message: 'Rol creado',
                rseponse: await this.rolRepo.save(nuevoRol)
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Error interno'
            }
        }
    }

    async consultarTodos() {
        return await this.rolRepo.find();
    }

    async consultarPorId(Id: number) {
        return await this.rolRepo.findOne({ where: { id: Id } });
    }

    async actualizarRol(id: number, data: ActualizarRolDto) {
        try {
            const rol = await this.rolRepo.findOne({ where: { id } });
            if (rol) {
                await this.rolRepo.merge(rol, data);
                return {
                    statusCode: 201,
                    message: 'El usuario ha sido actualizado',
                    response: await this.rolRepo.save(rol)
                }
            }
            return {
                statusCode: 200,
                message: 'Usuario no encontrado'
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Error Interno'
            }
        }
    }

    async eliminarUsuario(id: number) {
        try {
            const rol = await this.rolRepo.findOne({ where: { id } })
            if (rol) {
                await this.rolRepo.delete(rol);
                return {
                    statusCode: 202,
                    message: 'Usuario eliminado'
                }
            }
            return {
                statusCode: 200,
                message: 'Usuario no encontrado'
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Error Interno'
            }
        }
    }
}
