import { CarritoProducto } from "src/carrito/entidades/carritoProducto.entity";
import { Categoria } from "src/categoria/entidades/categoria.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    nombre: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column({ type: "decimal", precision: 12, scale: 2 })
    precio: number;

    @ManyToOne(() => Categoria, (categoria) => categoria.productos)
    @JoinColumn({ name: "producto_id" })
    categoria: Categoria;

    @OneToMany(() => CarritoProducto, (carritoProducto) => carritoProducto.producto)
    carritoProductos: CarritoProducto[]
    
}