import { ListaProdutosService } from './../lista-produtos/lista-produtos.service';
import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { Carrinho } from './entities/carrinho.entity';

@Injectable()
export class CarrinhoService {

  constructor(
    @InjectRepository(Carrinho)
    private readonly carrinhoRepo: Repository<Carrinho>,
    private readonly userService: UserService,
    private readonly listaProdutosService: ListaProdutosService
  ) { }

  async create(data: CreateCarrinhoDto) {
    const user = await this.userService.findOne(data.clienteId);
    let erros = false;
    const carrinho = this.carrinhoRepo.create({
      cliente: user
    });
    const carrinhoSaved = await this.carrinhoRepo.save(carrinho);

    if (!carrinhoSaved) {
      throw new InternalServerErrorException('Problema ao criar um carrinho');
    }
    const erro = data.produtos.map(async (produto) => {
      try {
        await this.listaProdutosService.create({ carrinho: carrinhoSaved, ...produto });
        
      }
      catch (err) {
       return true;
      }
    })
    const hasError = await Promise.all(erro);
    if (hasError.includes(true)) {
      console.log('dentro de erros');
      await this.remove(carrinhoSaved.id);
      return new BadRequestException('problemas ao criar carrinho');
    }
    return carrinhoSaved;
  }

  async findAll(clienteId: string) {
    return await this.carrinhoRepo.find({
      where: {
        cliente: {
          id: clienteId
        }
      },
      relations: ["produtos", "produtos.produto"]
    });
  }

  async findOne(id: string) {
    try {
      return await this.carrinhoRepo.findOneOrFail({
        where: { id },
      });
    }
    catch (err) {
      throw new NotFoundException('carrinho nao encontrado')
    }
  }

  async remove(id: string) {
    const carrinho = await this.findOne(id);
    return (await this.carrinhoRepo.remove(carrinho)) ? true : false;
  }
}
