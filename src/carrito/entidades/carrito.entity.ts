import { Pedido } from "src/pedido/entidades/pedido.entity";
import { Usuario } from "src/usuario/entidades/usuario.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarritoProducto } from "./carritoProducto.entity";

@Entity()
export class Carrito{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.carritos)
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario;
    
    @OneToOne(() => Pedido)
    @JoinColumn({ name: "pedido_id" })
    pedido: Pedido;

    @OneToMany(() => CarritoProducto, (carritoProducto) => carritoProducto.carrito)
    carritoProductos: CarritoProducto[];
}