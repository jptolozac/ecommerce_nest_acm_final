import { Producto } from "src/producto/entidades/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    nombre: string;

    @Column({ type: "text"})
    descripcion: string;
    
    // Relacion uno a muchos
    @OneToMany(() => Producto, (producto) => producto.categoria)
    productos: Producto[];
}