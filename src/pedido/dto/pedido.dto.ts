import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CrearPedidoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    total: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    estado: string;

    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    fecha_creacion: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cedula_usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    carrito_id: number;
}

export class ActualizarPedidoDto extends PartialType(CrearPedidoDto) {}