import fs from 'fs';
import express from 'express';
import path from 'path';
import passport from 'passport';
import cors from 'cors';
import routes from './api/routes/index';
import sequelize from './data/db/connection';
import errorHandlerMiddleware from './api/middlewares/errorHandlerMiddleware';
import env from './env';
import './config/passportConfig';

const app = express();

sequelize
  .authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

routes(app);

const staticPath = path.resolve(`${__dirname}/../client/build`);
app.use(express.static(staticPath));

app.get('*', (req, res) => {
  res.write(fs.readFileSync(`${__dirname}/../client/build/index.html`));
  res.end();
});

app.use(errorHandlerMiddleware);
app.listen(env.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${env.app.port}!`);
});
