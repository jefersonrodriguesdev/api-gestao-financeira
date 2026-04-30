import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn("uuid") 
    id!: string;

    @Column()
    nome!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    senha!: string; // Salvaremos o hash aqui
}