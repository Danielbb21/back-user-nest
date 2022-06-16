import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}

  @Post()
  create(@Body() createCarrinhoDto: CreateCarrinhoDto) {
    return this.carrinhoService.create(createCarrinhoDto);
  }

  @Get(':clienteid')
  findAll(@Param('clienteid') clienteId: string ) {
    return this.carrinhoService.findAll(clienteId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrinhoService.remove(id);
  }
}
