import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport"
import { AuthService } from './servicios/auth.service';
import { AuthController } from './controladores/auth.controller';
import { JwtStrategy } from './estrategia/estrategia';
import { Usuario } from 'src/usuario/entidades/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/usuario/entidades/rol.entity';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'ACM_APIREST',
            signOptions: { expiresIn: '2h' }
        }),
        TypeOrmModule.forFeature([ Usuario, Rol ])
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule { }
