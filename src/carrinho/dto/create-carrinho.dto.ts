
export class CreateCarrinhoDto {
  clienteId: string;

  produtos: produto[];
}
interface produto {
  produtoId: string;

  quantidade: number;
}
