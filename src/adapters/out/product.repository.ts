import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { ProductRepositoryPort } from '../../ports/out/product.repository';

@Injectable()
export class ProductRepository implements ProductRepositoryPort {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async findById(id: number): Promise<Product | undefined> {
    return this.repository.findOneBy({ id });
  }

  async updateStock(id: number, stock: number): Promise<void> {
    await this.repository.update(id, { stock });
  }
}
