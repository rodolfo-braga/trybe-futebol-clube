import * as express from 'express';
import errorHandler from './middlewares/error';
import clubsRoute from './routes/clubs.route';
import loginRoute from './routes/login.route';
import matchsRoute from './routes/matchs.route';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/login', loginRoute);
    this.app.use('/clubs', clubsRoute);
    this.app.use('/matchs', matchsRoute);
    this.app.use(errorHandler);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`ouvindo porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
