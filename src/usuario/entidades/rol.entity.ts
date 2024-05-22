import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Usuario } from './usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Rol {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty()
    @Column({ type: 'varchar', length: 50 })
    nombre: string;

    //Relaciones
    @OneToMany(() => Usuario, (usuario) => usuario.fk_rol_user)
    usuario: Usuario[];
}