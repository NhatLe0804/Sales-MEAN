

import { Request, Response, NextFunction } from 'express';
import Product from './models/product';
import { Filter } from '../src/app/sales/models/filter.model';
import { ParamsForQuery } from '../src/app/sales/models/params-to-filter.enum';
// tslint:disable-next-line:prefer-const
export class ProductRoute {
  productRoute(app): void {
    app.route('/api/products').get((req: Request, res: Response, next: NextFunction) => {
      Product.find((error, products) => {
        if (error) {
          return next(error.message);
        } else {
          res.json(products);
        }
      });
    });

    app.route('/api/product/add').post((req: Request, res: Response, next: NextFunction) => {
      const product = new Product(req.body);
      product.save().then(() => {
        res.status(200).json({ product: 'Add Done' });
      }).catch(error => {
        res.status(400).end(error.message);
      });
    });

    app.route('/api/product/:id').get((req: Request, res: Response, next: NextFunction) => {
      Product.findById(req.params.id, (error, data) => {
        if (error) {
          return next(error.message);
        } else {
          res.json(data);
        }
      });
    });



    // ================ Excuting special functions ================

    // ========= Top Sales
    app.route('/api/products-top-sales').get((req: Request, res: Response, next: NextFunction) => {
      Product.find({}).sort({ bought: -1 }).limit(12).exec((error, data) => {
        if (error) {
          return next(error.message);
        }
        res.status(200).json(data);
      });
    });

    // ========= Product newest
    app.route('/api/products-newest').get((req: Request, res: Response, next: NextFunction) => {
      Product.find().sort({ date: -1 }).limit(12).exec((error, data) => {
        if (error) {
          return next(error.message);
        }
        res.status(200).json(data);
      });
    });

    // ========= Product advance
    app.route('/api/products-advance').get((req: Request, res: Response, next: NextFunction) => {
      Product.find({ price: { $gte: 20000000 } }).sort({ price: -1 }).limit(12).exec((error, data) => {
        if (error) {
          return next(error.message);
        }
        res.status(200).json(data);
      });
    });

    //
    app.route('/api/filter').post((req: Request, res: Response, next: NextFunction) => {

      const queryDynamic = this.buildQueryDynamic(req.body);
      console.log(queryDynamic);
      const filterModel = Product.find(queryDynamic.find);

      if (queryDynamic.sort) {
        filterModel.sort(queryDynamic.sort);
      }
      filterModel.exec((error, data) => {
        if (error) {
          console.log('loi~');
          return next(error.message);
        }
        console.log(data);
        res.status(200).json(data);
      });
    });
  }



  private buildQueryDynamic(filterParams: Filter) {

    const filterObj: { [k: string]: any } = {};
    filterObj.find = {};  // use for get all products

    if (filterParams.find) {
      filterObj.find = filterParams.find;
    }

    if (filterParams.sortByOthers) {
      switch (filterParams.sortByOthers) {
        case ParamsForQuery.Ascending:
          filterObj.sort = { price: 1 };
          break;
        case ParamsForQuery.Descending:
          filterObj.sort = { price: -1 };
          break;
        case ParamsForQuery.Newest:
          filterObj.sort = { date: -1 };
          break;
        case ParamsForQuery.Popular:
          filterObj.sort = { bought: -1 };
          break;
        default:
          break;
      }
    }
    if (filterParams.byColor) {
      // $all use for search multi value
      filterObj.find = { colour: { $all: filterParams.byColor } };
    }
    return filterObj;
  }
}

