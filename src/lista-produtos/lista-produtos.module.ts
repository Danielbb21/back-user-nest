import { Produto } from './entities/produto.entity';
import { User } from 'src/user/entities/user.entity';
import { CarrinhoService } from './../carrinho/carrinho.service';
import { ListaProduto } from './entities/lista-produto.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Module } from '@nestjs/common';
import { ListaProdutosService } from './lista-produtos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule,TypeOrmModule.forFeature([Carrinho, ListaProduto, User, Produto])],
  controllers: [],
  providers: [ListaProdutosService]
})
export class ListaProdutosModule {}
