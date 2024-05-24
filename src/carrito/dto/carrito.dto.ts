import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";
import { CrearCarritoProductoDto } from "./carritoProducto.dto";

export class CrearCarritoDto {
    // @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    // cedula_usuario: string;

    @ApiProperty({
        type: [CrearCarritoProductoDto]
    })
    @IsNotEmpty()
    @IsArray()
    productos: CrearCarritoProductoDto[]
}

export class ActualizarCarritoDto extends PartialType(CrearCarritoDto) {}