import jwt from 'jsonwebtoken';
import { secret, expiresIn } from '../config/jwtConfig';

export const createToken = data => jwt.sign(data, secret, { expiresIn });

// eslint-disable-next-line no-unused-vars
export const mockCreateToken = _ => (
  // типа для гречки
  // eslint-disable-next-line max-len
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWVsZCI6InJvbWEgcGlkb3IiLCJpYXQiOjEyMzEyMzEzMjF9.WVBd50gY1jaa92G7guOGes7jdhA9JUdVM4gJyav4Sak'
);
