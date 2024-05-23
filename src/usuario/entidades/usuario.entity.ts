import { Exclude } from 'class-transformer';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Rol } from './rol.entity';
import { Pedido } from 'src/pedido/entidades/pedido.entity';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 20})
    cedula: string;

    @Column({type: 'varchar', length: 50})
    nombre: string;

    @Column({type: 'varchar', length: 50})
    apellido: string;

    @Column({type: 'date'})
    fechaNacimiento: Date;

    @Column({type: 'varchar', length: 15})
    telefono: string;

    @Column({type: 'varchar', length: 50})
    correo: string;

    @Column({type: 'varchar', length: 100})
    direccion: string;

    @Exclude()
    @Column({type: 'varchar', length: 200})
    password: string;

    @ManyToOne(() => Rol, (rol) => rol.usuario, {
        nullable: false
    })
    @JoinColumn({ name: "fk_rol_usuario"})
    fk_rol_user: Rol;
    
    @OneToMany(() => Pedido, (pedido) => pedido.usuario)
    pedidos: Pedido[]
}