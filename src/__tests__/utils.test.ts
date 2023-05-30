import { getAllAccounts, getAllTransactions } from '../utils';
// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';
// import { instance } from '../request';

// jest.mock('../request');

describe('src/utils.ts', () => {
  describe('getAllAccounts', () => {
    it('should retrun all accounts for the latest page', async () => {
      // Je n'arrive pas correctement à Mock Axios
      // const mock = new MockAdapter(axios);

      // mock.onGet('/accounts?page=1').reply(200, {
      //   accounts: [
      //     {
      //       acc_number: '00001',
      //       amount: 90,
      //       currency: 'EUR',
      //     },
      //   ],
      //   links: {
      //     self: 'string',
      //     next: 'string',
      //   },
      // });
      // Given
      const received = await getAllAccounts({
        link: '/accounts?page=4',
        results: [],
      });

      // Then
      // expect(mock).toHaveBeenCalled();
      expect(received).toHaveLength(3);
    });

    it('should retrun all empty arry when accounts is empty', async () => {
      expect.assertions(2);
      const received = await getAllAccounts({
        link: '/accounts?page=5',
        results: [],
      });

      expect(received).toStrictEqual([]);
      expect(received).toHaveLength(0);
    });
  });

  describe('getAllTransactions', () => {
    it('should return all transaction for user "0000009"', async () => {
      const received = await getAllTransactions({
        link: '/accounts/0000009/transactions?page=1',
        results: [],
      });

      expect(received).toHaveLength(6);
    });

    it("should return empty array when user don't have transactions ", async () => {
      expect.assertions(2);
      const received = await getAllTransactions({
        link: '/accounts/0000008/transactions?page=1',
        results: [],
      });

      expect(received).toStrictEqual([]);
      expect(received).toHaveLength(0);
    });
  });
});
