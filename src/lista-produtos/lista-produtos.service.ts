import { Produto } from './entities/produto.entity';
import { CarrinhoService } from './../carrinho/carrinho.service';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateListaProdutoDto } from './dto/create-lista-produto.dto';
import { ListaProduto } from './entities/lista-produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ListaProdutosService {
  constructor(
    @InjectRepository(ListaProduto)
    private readonly listaRepo: Repository<ListaProduto>,
    private readonly httpService: HttpService
  ){}
  async create(data: CreateListaProdutoDto) {
    // axios buscar produto;
    let produto: Produto;
    try{
      let request = await this.httpService.axiosRef.get('http://localhost:3005/produto/'+data.produtoId);
      produto = request.data;
    }
    catch(err){
      throw new NotFoundException("não foi possivel encontrar um produto");
    }

    if(produto.estoque < data.quantidade){
      throw new BadRequestException('sem estoque');
    }
    else{
      await this.httpService.axiosRef.patch('http://localhost:3005/produto/'+produto.id, {
        estoque: (produto.estoque - data.quantidade)
      })
    }

    const lista = this.listaRepo.create({
      carrinho: data.carrinho,
      produto,
      quantidade: data.quantidade
    });
    const listaSaved = await this.listaRepo.save(lista);
    if (!listaSaved) {
      throw new InternalServerErrorException('Problema ao criar um item da lista');
    }
    return listaSaved;
  }

  async findAll(carrinhoId: string) {
    return await this.listaRepo.find({
      where: { carrinho: { id: carrinhoId } },
      relations: ["produto"]
    });
  }
}
