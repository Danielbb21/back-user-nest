import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { ListaProdutosModule } from './lista-produtos/lista-produtos.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(),
    CarrinhoModule,
    ListaProdutosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
