import { mockCreateToken } from './tokenHelper';

jest.mock('../config/jwtConfig', () => ({
  secret: 'secret',
  expiresIn: '1h'
}));

describe('tokenHelper', () => {
  describe('createToken', () => {
    it('should work as expected', () => {
      const data = {
        field: 'value'
      };
      expect(mockCreateToken(data))
        .toEqual(
          // eslint-disable-next-line max-len
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWVsZCI6InJvbWEgcGlkb3IiLCJpYXQiOjEyMzEyMzEzMjF9.WVBd50gY1jaa92G7guOGes7jdhA9JUdVM4gJyav4Sak'
        );
    });
  });
});
