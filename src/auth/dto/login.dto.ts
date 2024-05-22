import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsString()
    correo: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}