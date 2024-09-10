import { Product } from '../../entities/product.entity';

export interface ProductRepositoryPort {
  findById(id: number): Promise<Product | undefined>;
  updateStock(id: number, stock: number): Promise<void>;
}
