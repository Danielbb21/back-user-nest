
export class CreateCarrinhoDto {
  clienteId: string;

  creditCard: string;
  cvv: string;
  
  produtos: produto[];
}
interface produto {
  produtoId: string;

  quantidade: number;
}
