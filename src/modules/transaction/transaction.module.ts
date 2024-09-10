import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from '../../core/transaction/transaction.service';
import { Transaction } from '../../entities/transaction.entity';
import { Product } from '../../entities/product.entity';
import { TransactionRepository } from '../../adapters/out/transaction.repository';
import { ProductRepository } from '../../adapters/out/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Product])],
  providers: [TransactionService, TransactionRepository, ProductRepository],
  exports: [TransactionService],
})
export class TransactionModule {}
