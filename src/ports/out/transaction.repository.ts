import { Transaction } from '../../entities/transaction.entity';

export interface TransactionRepositoryPort {
  create(data: Partial<Transaction>): Promise<Transaction>;
  update(id: number, data: Partial<Transaction>): Promise<void>;
}
