import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('produtos')
export class Produto {
    @PrimaryGeneratedColumn('uuid')
    id:string; 

    @Column()
    Nome: string;

    @Column()
    descricao: string;

    @Column({type: "float"})
    preco: number;

    @Column() 
    imagem: string;
}