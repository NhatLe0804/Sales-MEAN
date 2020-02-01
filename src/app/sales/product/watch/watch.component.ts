import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { StateService } from '../../../services/state.service';
import { WatchModel } from '../../models/watch.model';
import { BaseComponent } from '../../base/base.model';
import { ParamsToRunQuery } from '../../models/params-to-run-query.enum';
@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent extends BaseComponent implements OnInit {

  products: WatchModel[];
  @Input() paramsToRunQuery: ParamsToRunQuery;
  @Input() isShowFilterAndSearch = true;
  constructor(private productService: ProductService, stateService: StateService) {
    super(stateService, true);
  }

  ngOnInit() {
    this.runQueryByParam();
  }

  runQueryByParam() {
    switch (this.paramsToRunQuery) {
      case ParamsToRunQuery.TopSales:
        this.productService.getTopSales().subscribe((response: WatchModel[]) => {
          this.products = response;
        }, (err) => {
          console.log(err);
        });
        break;
      case ParamsToRunQuery.ProductsNewest:
        this.productService.getProductsNewest().subscribe((response: WatchModel[]) => {
          this.products = response;
        }, (err) => {
          console.log(err);
        });
        break;
      case ParamsToRunQuery.ProductAdvance:
        this.productService.getProductsNewest().subscribe((response: WatchModel[]) => {
          this.products = response;
        }, (err) => {
          console.log(err);
        });
        break;
      default:
        this.productService.getProduct().subscribe((response: WatchModel[]) => {
          this.products = response;
        }, (err) => {
          console.log(err);
        });
        break;
    }
  }

}
