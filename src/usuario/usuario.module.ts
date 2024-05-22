import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entidades/usuario.entity';
import { UsuarioController } from './controladores/usuario.controller';
import { UsuarioService } from './servicios/usuario.service';
import { Rol } from './entidades/rol.entity';
import { RolService } from './servicios/rol/rol.service';
import { RolController } from './controladores/rol/rol.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ Usuario, Rol ])],
    controllers: [UsuarioController, RolController],
    providers: [UsuarioService, RolService],
    // exports: [UsuarioService, RolService]
})
export class UsuarioModule { }
