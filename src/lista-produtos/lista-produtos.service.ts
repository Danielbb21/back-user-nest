import { Produto } from './entities/produto.entity';
import { CarrinhoService } from './../carrinho/carrinho.service';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateListaProdutoDto } from './dto/create-lista-produto.dto';
import { ListaProduto } from './entities/lista-produto.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListaProdutosService {
  constructor(
    @InjectRepository(ListaProduto)
    private readonly listaRepo: Repository<ListaProduto>,
    @InjectRepository(Produto)
    private readonly produtoRepo: Repository<Produto>,
  ){}
  async create(data: CreateListaProdutoDto) {
    // axios buscar produto;
    let produto: Produto;
    try{
      produto = await this.produtoRepo.findOneOrFail(data.produtoId);
    }
    catch(err){
      throw new NotFoundException("não foi possivel encontrar um produto");
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
