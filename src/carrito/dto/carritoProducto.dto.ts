import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CrearCarritoProductoDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    producto_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    cantidad: number;
}

export class ActualizarCarritoProductoDto extends PartialType(CrearCarritoProductoDto) {}