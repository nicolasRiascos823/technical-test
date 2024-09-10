import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  amount: number;

  @Column()
  token: string;

  @Column()
  deliveryInfo: string;

  @Column({ nullable: true })
  transactionId: string;

  @Column('json', { nullable: true })
  response: any;

  @Column()
  productId: number;

  @Column()
  newStock: number;
}
