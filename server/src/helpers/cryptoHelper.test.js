import { encryptSync, compare } from './cryptoHelper';

describe('cryptoHelper', () => {
  describe('compare', () => {
    it('should work identically', () => {
      const valueToHash = 'value';
      expect(compare(valueToHash, encryptSync(valueToHash))).toBeTruthy();
    });
  });
});
