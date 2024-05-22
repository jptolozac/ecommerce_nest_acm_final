import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    nombre: string;

    @Column({ type: "text"})
    descripcion: string;
    
    // TODO: Relaciones uno a muchos
}