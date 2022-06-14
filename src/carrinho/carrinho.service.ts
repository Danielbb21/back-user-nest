import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';
import { Carrinho } from './entities/carrinho.entity';

@Injectable()
export class CarrinhoService {

  constructor(
    @InjectRepository(Carrinho)
    private readonly carrinhoRepo: Repository<Carrinho>,
    private readonly userService: UserService) { }

  async create(data: CreateCarrinhoDto) {
    const user = await this.userService.findOne(data.clienteId);

    const carrinho = this.carrinhoRepo.create({
      cliente: user
    });
    const carrinhoSaved = await this.carrinhoRepo.save(carrinho);

    if (!carrinhoSaved) {
      throw new InternalServerErrorException('Problema ao criar um carrinho');
    }

    return carrinhoSaved;
  }

  async findAll() {
    return await this.carrinhoRepo.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} carrinho`;
  }

  update(id: string, data: UpdateCarrinhoDto) {
    return `This action updates a #${id} carrinho`;
  }

  remove(id: string) {
    return `This action removes a #${id} carrinho`;
  }
}
