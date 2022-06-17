import { User } from './../../user/entities/user.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';

export class RetornoCarrinhoDto {
    creditCard: string;
    status: string;
    carrinho: Carrinho;
    valor: number;
  }
  