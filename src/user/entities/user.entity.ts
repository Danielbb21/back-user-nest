import { Carrinho } from "src/carrinho/entities/carrinho.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column()
  nome: string;

  @Column()
  senha:string;

  @Column()
  email:string;

  @Column()
  admin: boolean;

  @OneToMany(()=> Carrinho, carrinho=> carrinho.cliente)
  carrinhos?: Carrinho[];
}
