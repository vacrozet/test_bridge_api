/* eslint-disable @typescript-eslint/no-var-requires */
import callApi from './request';

export type Account = {
  acc_number: string;
  amount: number;
  currency: string;
};

export type Transactions = {
  id: number;
  label: string;
  sign: string;
  amount: number;
  currency: string;
};

export const getAllAccounts = async ({
  link,
  results,
}: {
  link: string;
  results: Account[];
}): Promise<Account[]> => {
  const { accounts, links } = await callApi(link);
  const newArray: Account[] = [...accounts, ...results].filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.acc_number === value.acc_number),
  );

  // if next page exist
  if (links.next) {
    return getAllAccounts({ link: links.next, results: newArray });
  }

  return newArray;
};

export const getAllTransactions = async ({
  link,
  results,
}: {
  link: string;
  results: Transactions[];
}): Promise<Transactions[]> => {
  const { transactions, links } = await callApi(link);
  const newArray: Transactions[] = [...transactions, ...results].filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id),
  );

  // if next page exist
  if (links.next) {
    return getAllTransactions({ link: links.next, results: newArray });
  }

  return newArray;
};
