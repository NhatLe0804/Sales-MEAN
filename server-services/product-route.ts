

import { Request, Response, NextFunction } from 'express';
import Product from './models/product';

// tslint:disable-next-line:prefer-const
export class ProductRoute {
    productRoute(app): void {
        app.route('/api/products').get((req: Request, res: Response, next: NextFunction) => {
            Product.find((err, products) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(products);
                }
            });
        });

        app.route('/api/product/add').post((req, res) => {
            const product = new Product(req.body);
            product.save().then( () => {
                res.status(200).json({product : 'Add Done'});
            }).catch(err => {
                res.status(400).send('fail');
            });
        });
    }
}

