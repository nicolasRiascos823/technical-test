import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { ProductRepository } from '../../adapters/out/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductRepository],
  exports: [ProductRepository],
})
export class ProductModule {}
