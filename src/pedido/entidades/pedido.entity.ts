import { Carrito } from "src/carrito/entidades/carrito.entity";
import { Usuario } from "src/usuario/entidades/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "decimal", precision: 12, scale: 2 })
    total: number;

    @Column({ type: "varchar", length: 50 })
    estado: string;

    @Column({ type: "date" })
    fecha_creacion: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.pedidos, { nullable: false })
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario;

    @OneToOne(() => Carrito)
    @JoinColumn({ name: "carrito_id" })
    carrito: Carrito;
}
