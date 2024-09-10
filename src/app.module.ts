import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ProductModule } from './modules/product/product.module';
import { Transaction } from './entities/transaction.entity';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Transaction, Product],
      synchronize: true, // No usar en producción, se recomienda usar migraciones
    }),
    TransactionModule,
    ProductModule,
  ],
})
export class AppModule {}
