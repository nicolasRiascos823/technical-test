import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { TransactionRepositoryPort } from '../../ports/out/transaction.repository';
import { ProductRepositoryPort } from '../../ports/out/product.repository';
import { Transaction } from '../../entities/transaction.entity';

@Injectable()
export class TransactionService {
  private readonly PAYMENT_API_URL = process.env.PAYMENT_URL;
  private readonly PAYMENT_API_KEY = process.env.PAYMENT_API_KEY;

  constructor(
    private readonly transactionRepository: TransactionRepositoryPort,
    private readonly productRepository: ProductRepositoryPort
  ) {}

  async createTransaction(paymentData: any): Promise<Transaction> {
    // Crea una transacción en estado PENDING en tu base de datos
    const transaction = await this.transactionRepository.create({
      status: 'PENDING',
      ...paymentData,
    });

    try {
      // Llama a la API de payment para procesar el pago
      const response = await axios.post(
        `${this.PAYMENT_API_URL}/transactions`,
        {
          amount_in_cents: paymentData.amount * 100, // Convertir a centavos
          currency: 'COP',
          payment_method: {
            type: 'CARD',
            token: paymentData.token, // Asegúrate de incluir el token de la tarjeta
          },
          // Agregar otros parámetros requeridos por la API de PAYMENT
        },
        {
          headers: {
            Authorization: `Bearer ${this.PAYMENT_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Actualiza la transacción con el resultado de Wompi
      await this.transactionRepository.update(transaction.id, {
        status: 'COMPLETED',
        transactionId: response.data.id,
        response: response.data,
      });

      // Actualiza el stock del producto
      await this.productRepository.updateStock(paymentData.productId, paymentData.newStock);

      return transaction;
    } catch (error) {
      await this.transactionRepository.update(transaction.id, { status: 'FAILED' });
      throw new InternalServerErrorException('Payment failed');
    }
  }
}
