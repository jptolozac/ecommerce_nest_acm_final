import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Categoria } from "src/categoria/entidades/categoria.entity";

export class CrearProductoDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    precio: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    categoria: Categoria;
}

export class ActualizarProductoDto extends PartialType(CrearProductoDto) {}