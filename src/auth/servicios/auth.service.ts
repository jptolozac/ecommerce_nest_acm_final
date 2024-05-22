import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ActualizarUsuarioDto, CrearUsuarioDto } from 'src/usuario/dto/usuario.dto';
import { Usuario } from 'src/usuario/entidades/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario) 
        private usuarioRepo: Repository<Usuario>,
        private jwtService: JwtService
    ) {}

    async prueba() {
        return 'Primer servicio';
    }

    async login(correo: string, password: string) {
        try {
            const user = await this.usuarioRepo.find({ where: [{ correo: correo, password: password }], relations: ["fk_rol_user"] });
            if (user.length == 0) {
                return {
                    statusCode: 401,
                    message: "Datos incorrectos"
                }
            }
            const payload = { username: user[0].correo, sub: user[0].cedula, roles: user[0].fk_rol_user.nombre };
            return {
                statusCode: 200,
                user: user,
                access_token: this.jwtService.sign(payload),
                Response: true
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: "Error interno"
            }
        }
    }

    async crearUsuario(data: CrearUsuarioDto) {
        try {
            const user = await this.usuarioRepo.find({ where: [{ cedula: data.cedula }, { correo: data.correo }] });

            if (user.length > 0) {
                return {
                    statusCode: 200,
                    message: 'El usuario ya esta creado'
                }
            } else {
                const nuevoUsuario = this.usuarioRepo.create(data);
                return {
                    statusCode: 201,
                    message: 'Usuario creado',
                    rseponse: await this.usuarioRepo.save(nuevoUsuario)
                }
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Error interno'
            }
        }
    }
    async consultarTodos() {
        return await this.usuarioRepo.find({
            relations: ["fk_rol_user"]
        });
    }
    async consultarUsuario(cedula: string) {
        return await this.usuarioRepo.findOne({ where: { cedula } });
    }

    async actualizarUsuario(cedula: string, data: ActualizarUsuarioDto) {
        try {
            const user = await this.usuarioRepo.findOne({ where: { cedula: cedula } });
            if (user) {
                await this.usuarioRepo.merge(user, data);
                return {
                    statusCode: 201,
                    message: 'El usuario ha sido actualizado',
                    response: await this.usuarioRepo.save(user)
                }
            } else {
                return {
                    statusCode: 200,
                    message: 'Usuario no encontrado'
                }
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Error Interno'
            }
        }
    }

    async eliminarUsuario(cedula: string) {
        try {
            const user = await this.usuarioRepo.findOne({ where: { cedula } })
            if (user) {
                await this.usuarioRepo.delete(user);
                return {
                    statusCode: 202,
                    message: 'Usuario eliminado'
                }
            } else {
                return {
                    statusCode: 200,
                    message: 'Usuario no encontrado'
                }
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Error Interno'
            }
        }
    }
}
