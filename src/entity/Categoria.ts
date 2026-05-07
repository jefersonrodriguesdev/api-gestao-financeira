import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Categoria {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column()
    tipo!: string;
}