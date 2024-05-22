import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuarioService } from '../servicios/usuario.service';
import { ActualizarUsuarioDto, CrearUsuarioDto } from '../dto/usuario.dto';
import { LoginDto } from '../../auth/dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiTags("Usuario")
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) { }

    @Get('prueba')
    @Roles('ADMIN')
    prueba(): string {
        return this.usuarioService.prueba()
    }

    // @UsePipes(new ValidationPipe())
    // @ApiOperation({ summary: 'Crear un nuevo usuario' })
    // @ApiBody({ type: CrearUsuarioDto }) // Especifica el tipo del cuerpo esperado
    // @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
    // @ApiResponse({ status: 400, description: 'Datos de usuario inválidos' })
    @Post('login')
    async login(@Body() payload: LoginDto) {
        return this.usuarioService.login(payload.correo, payload.password);
    }

    @Get('consultarUsuarios')
    async findAll() {
        return await this.usuarioService.consultarTodos();
    }
    @Get('consultarUsuario/:cedula')
    async findOne(@Param('cedula', ParseIntPipe) cedula: string) {
        return await this.usuarioService.consultarUsuario(cedula);
    }

    @Post('crearUsuario')
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiBody({ type: CrearUsuarioDto }) // Especifica el tipo del cuerpo esperado
    @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
    @ApiResponse({ status: 400, description: 'Datos de usuario inválidos' })
    @UsePipes(new ValidationPipe())
    async crearUsuario(@Body() data: CrearUsuarioDto) {
        return await this.usuarioService.crearUsuario(data);
    }

    @Put('actualizarUsuario/:cedula')
    @UsePipes(new ValidationPipe())
    async actualizarUsuario(@Param('cedula', ParseIntPipe) cedula: string, @Body() data: ActualizarUsuarioDto) {
        return await this.usuarioService.actualizarUsuario(cedula, data);
    }

    @Delete('eliminarUsuario/:cedula')
    @UsePipes(new ValidationPipe())
    async eliminarUsuario(@Param('cedula', ParseIntPipe) cedula: string) {
        return await this.usuarioService.eliminarUsuario(cedula);
    }
}
