import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CrearRolDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nombre: string;
}
export class ActualizarRolDto extends CrearRolDto { }