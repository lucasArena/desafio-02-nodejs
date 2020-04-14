import { response } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Transaction type is not valid');
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      const total = balance.total - value;

      if (total < 0) {
        throw Error('You do not have money to withdrawl');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
