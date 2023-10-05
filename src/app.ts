import 'dotenv/config';
import cors from 'cors';
import express, { json } from 'express';
import morgan from 'morgan';
import { sanatizeBody } from '@lib/middlewares/sanatizeBody.middleware';
import { authRouter } from '@auth/routes/auth.routes';
import { productsRouter } from '@products/routes/products.route';

export class AppBluna {

    private app: express.Application

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(json());
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.static('public'));
        this.app.use(sanatizeBody);
    }

    routes() {
        this.app.use('/auth', authRouter);
        this.app.use('/products', productsRouter);
    }

    listen(port: number | string) {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                try {
                    console.log(`🚀 Application running on port ${port}`);
                    resolve('all good');
                } catch (error) {
                    if (error instanceof Error) {
                        console.log(error.message);
                        reject(error.message)
                    }
                }
            });
        });
    }


}