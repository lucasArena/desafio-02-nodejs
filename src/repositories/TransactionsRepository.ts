import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionService {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const { transactions } = this;
    const balance = transactions.reduce(
      (total, current) => {
        return {
          income:
            current.type === 'income'
              ? total.income + current.value
              : total.income,
          outcome:
            current.type === 'outcome'
              ? total.outcome + current.value
              : total.outcome,
          total:
            current.type === 'income'
              ? total.total + current.value
              : total.total - current.value,
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, value, type }: CreateTransactionService): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
