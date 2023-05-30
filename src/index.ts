import Aigle from 'aigle';

import callApi from './request';
import { getAllAccounts, getAllTransactions, Transactions } from './utils';

export type usersFormatted = {
  acc_number: string;
  amount: number;
  transactions: Pick<Transactions, 'label' | 'amount' | 'currency'>[];
};

const main = async (): Promise<void> => {
  try {
    const response = await callApi('/health');
    if (response !== 'ok') {
      throw new Error('connection failed');
    }

    const accounts = await getAllAccounts({
      link: '/accounts?page=1',
      results: [],
    });

    const usersFormatted: usersFormatted[] = await Aigle.map(
      accounts,
      async (account) => {
        const transactions = await getAllTransactions({
          link: `/accounts/${account.acc_number}/transactions?page=1`,
          results: [],
        });

        return {
          acc_number: account.acc_number,
          amount: account.amount,
          transactions: transactions.map(({ label, amount, currency }) => ({
            label,
            amount,
            currency,
          })),
        };
      },
    );

    console.log(usersFormatted);
  } catch (error) {
    throw error;
  }
};

main();
