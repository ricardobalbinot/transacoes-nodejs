import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
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
    return this.transactions;
  }

  private sumTransactions(type: string): number {
    return this.transactions
      .filter(transaction => transaction.type === type)
      .reduce(
        (total, filteredTransaction) => total + filteredTransaction.value,
        0,
      );
  }

  public getBalance(): Balance {
    const income = this.sumTransactions('income');

    const outcome = this.sumTransactions('outcome');

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
