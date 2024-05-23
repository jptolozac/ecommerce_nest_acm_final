import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../servicios/auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrearUsuarioDto } from 'src/usuario/dto/usuario.dto';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() payload: LoginDto) {
        return this.authService.login(payload.correo, payload.password);
    }

    @Post('crearUsuario')
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiBody({ type: CrearUsuarioDto }) // Especifica el tipo del cuerpo esperado
    @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
    @ApiResponse({ status: 400, description: 'Datos de usuario inválidos' })
    @UsePipes(new ValidationPipe())
    async crearUsuario(@Body() data: CrearUsuarioDto) {
        return await this.authService.crearUsuario(data);
    }
}
