import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../servicios/auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrearUsuarioDto } from 'src/usuario/dto/usuario.dto';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // @ApiOperation({ summary: 'Loguear un usuario existente' })
    @ApiBody({ type: LoginDto }) // Especifica el tipo del cuerpo esperado
    @ApiResponse({ status: 200, description: 'Usuario logueado con éxito' })
    @ApiResponse({ status: 400, description: 'Datos de usuario inválidos' })
    @Post('login')
    async login(@Body() payload: LoginDto) {
        return this.authService.login(payload.correo, payload.password);
    }

    // @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiBody({ type: CrearUsuarioDto }) // Especifica el tipo del cuerpo esperado
    @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
    @ApiResponse({ status: 400, description: 'Datos de usuario inválidos' })
    @Post('crearUsuario')
    @UsePipes(new ValidationPipe())
    async crearUsuario(@Body() data: CrearUsuarioDto) {
        return await this.authService.crearUsuario(data);
    }
}
