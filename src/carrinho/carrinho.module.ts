import { HttpModule } from '@nestjs/axios';
import { Produto } from './../lista-produtos/entities/produto.entity';
import { ListaProduto } from './../lista-produtos/entities/lista-produto.entity';
import { ListaProdutosService } from './../lista-produtos/lista-produtos.service';
import { Module } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoController } from './carrinho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrinho } from './entities/carrinho.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Carrinho, ListaProduto, Produto]), HttpModule],
  controllers: [CarrinhoController],
  providers: [CarrinhoService, UserService, ListaProdutosService]
})
export class CarrinhoModule {}
