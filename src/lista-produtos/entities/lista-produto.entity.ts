import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Produto } from './produto.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity('listas')
export class ListaProduto {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Carrinho, carrinho => carrinho.produtos)
    carrinho: Carrinho;

    @RelationId((lista: ListaProduto) => lista.carrinho)
    carrinhoId: string;
    
    @ManyToOne(() => Produto)
    produto: Produto;
    
    @RelationId((lista: ListaProduto) => lista.produto)
    produtoId: string;

    @Column({default: 1})
    quantidade: number;

}

