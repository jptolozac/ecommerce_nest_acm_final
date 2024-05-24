import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Carrito } from "./carrito.entity";
import { Producto } from "src/producto/entidades/producto.entity";

@Entity()
export class CarritoProducto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    cantidad: number;

    @ManyToOne(() => Carrito, (carrito) => carrito.carritoProductos)
    @JoinColumn({ name: "carrito_id" })
    carrito: Carrito;

    @ManyToOne(() => Producto, (producto) => producto.carritoProductos)
    @JoinColumn({ name: "producto_id" })
    producto: Producto;
}