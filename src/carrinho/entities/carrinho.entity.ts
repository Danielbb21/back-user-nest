import { ListaProduto } from './../../lista-produtos/entities/lista-produto.entity';
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";

@Entity('carrinhos')
export class Carrinho {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @ManyToOne(() => User, cliente => cliente.carrinhos)
  cliente: User;

  @RelationId((carrinho: Carrinho) => carrinho.cliente)
  clienteId: string;

  @OneToMany(() => ListaProduto, lista => lista.carrinho, {
    onDelete: 'CASCADE'
})
  produtos: ListaProduto[];

  @UpdateDateColumn()
  dataCompra: Date;

}

