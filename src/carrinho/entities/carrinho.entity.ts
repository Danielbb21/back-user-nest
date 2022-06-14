import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('carrinhos')
export class Carrinho {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @ManyToOne(() => User, cliente => cliente.carrinhos)
  cliente: User;

  @UpdateDateColumn()
  dataCompra: Date;

}
