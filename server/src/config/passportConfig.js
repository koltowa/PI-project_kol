import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { secret } from './jwtConfig';
import userRepository from '../data/repositories/userRepository';
import { compare } from '../helpers/cryptoHelper';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

passport.use(
  'login',
  new LocalStrategy({ usernameField: 'login' }, async (login, password, done) => {
    try {
      const user = await userRepository.getByEmail(login);
      if (!user) {
        return done({ status: 401, message: 'Incorrect email.' }, null, false);
      }

      if (!user.isActive) {
        return done({ status: 403, message: 'User with this credentials is blocked.' }, null, false);
      }

      return await compare(password, user.passwordHash)
        ? done(null, user)
        : done({ status: 401, message: 'Passwords do not match.' }, null, false);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  'register',
  new LocalStrategy({ usernameField: 'login', passReqToCallback: true }, async ({ body }, login, password, done) => {
    try {
      const userByEmail = await userRepository.getByEmail(login);
      if (userByEmail) {
        return done({ status: 401, message: 'Email is already taken.' }, null);
      }

      return done(null, { ...body, login, password });
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(new JwtStrategy(options, async ({ id }, done) => {
  try {
    const user = await userRepository.getById(id);
    return user ? done(null, user) : done({ status: 401, message: 'Token is invalid.' }, null);
  } catch (err) {
    return done(err);
  }
}));
