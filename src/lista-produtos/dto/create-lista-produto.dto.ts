import { Carrinho } from 'src/carrinho/entities/carrinho.entity';

export class CreateListaProdutoDto {
    carrinho: Carrinho;
    produtoId: string;
    quantidade: number;
}
