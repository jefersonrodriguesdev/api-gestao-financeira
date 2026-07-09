import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Usuario } from "./Usuario";
import { Categoria } from "./Categoria";
import { Tag } from "./Tag";

@Entity()
export class Transacao {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    descricao!: string;

    @Column("decimal")
    valor!: number;

    @Column()
    data!: Date;

    @Column({ nullable: true })
    comprovantePath!: string;

    @ManyToOne(() => Usuario)
    usuario!: Usuario;

    @ManyToOne(() => Categoria)
    categoria!: Categoria;

    @ManyToMany(() => Tag, { cascade: true })
    @JoinTable() 
    tags!: Tag[];
}