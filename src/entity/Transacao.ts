import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from "typeorm";

import { Usuario } from "./Usuario";
import { Categoria } from "./Categoria";

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
}