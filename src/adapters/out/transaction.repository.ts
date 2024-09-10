import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../entities/transaction.entity';
import { TransactionRepositoryPort } from '../../ports/out/transaction.repository';

@Injectable()
export class TransactionRepository implements TransactionRepositoryPort {
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) {}

  async create(data: Partial<Transaction>): Promise<Transaction> {
    return this.repository.save(data);
  }

  async update(id: number, data: Partial<Transaction>): Promise<void> {
    await this.repository.update(id, data);
  }
}
