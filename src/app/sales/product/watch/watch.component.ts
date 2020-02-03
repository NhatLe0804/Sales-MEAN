import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { StateService } from '../../../services/state.service';
import { WatchModel } from '../../models/watch.model';
import { BaseComponent } from '../../base/base.model';
import { ParamsForQuery } from '../../models/params-to-filter.enum';
import { Filter } from '../../models/filter.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent extends BaseComponent implements OnInit {

  products: WatchModel[];
  @Input() paramsToRunQuery: ParamsForQuery;
  @Input() isShowFilterAndSearch = true;
  ParamsForQuery = ParamsForQuery;
  private filter = new Filter();
  priceRange = [];

  constructor(private productService: ProductService, stateService: StateService) {
    super(stateService, true);
  }

  ngOnInit() {
    this.runQueryByParam();
  }

  runQueryByParam(paramToFilter?: ParamsForQuery) {
    const param = paramToFilter || this.paramsToRunQuery;
    switch (param) {
      case ParamsForQuery.TopSales:
        this.productService.getTopSales().subscribe((response: WatchModel[]) => {
          this.products = response;
        }, (err) => {
          console.log(err);
        });
        break;
      case ParamsForQuery.ProductsNewest:
        this.productService.getProductsNewest().subscribe((response: WatchModel[]) => {
          this.products = response;
        }, (err) => {
          console.log(err);
        });
        break;
      case ParamsForQuery.ProductAdvance:
        this.productService.getProductAdvance().subscribe((response: WatchModel[]) => {
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

  buildParamsForQuery(paramToFilter?: ParamsForQuery): Filter {
    switch (paramToFilter) {
      // ======= Find =======
      // filter.find is a dynamic property which mean you can find any fields in DB ( ex: 'userFor' field )
      case ParamsForQuery.ForMen:
        this.filter.find.useFor = ParamsForQuery.ForMen;
        break;
      case ParamsForQuery.ForWomen:
        this.filter.find.useFor = ParamsForQuery.ForWomen;
        break;
      case ParamsForQuery.ForCouple:
        this.filter.find.useFor = ParamsForQuery.ForCouple;
        break;
      case ParamsForQuery.Price:
        this.filter.find.price = this.priceRange;
        break;
      // ======= Sort =======
      case ParamsForQuery.Descending:
        this.filter.sortByOthers = ParamsForQuery.Descending;
        break;
      case ParamsForQuery.Ascending:
        this.filter.sortByOthers = ParamsForQuery.Ascending;
        break;
      case ParamsForQuery.Newest:
        this.filter.sortByOthers = ParamsForQuery.Newest;
        break;
      case ParamsForQuery.Popular:
        this.filter.sortByOthers = ParamsForQuery.Popular;
        break;

      default:
        this.filter = new Filter();
        break;
    }

    return this.filter;
  }

  excuteFilter(paramForQuery?: ParamsForQuery) {
    const filterObj = this.buildParamsForQuery(paramForQuery);

    this.productService.getProductsByFilter(filterObj).subscribe((response: WatchModel[]) => {
      if (response.length === 0) {
        Swal.fire({
          title: 'Thông Báo',
          text: 'Không có sản phẩm trong mục này, xin vui lòng thử lại hoặc liên hệ với chúng tôi',
          icon: 'info',
          showCancelButton: false,
          confirmButtonText: 'Tắt Thông Báo',
        });
      } else {
        this.products = response;
      }

    }, (err) => {
      Swal.fire({
        title: 'Đã xảy ra lỗi',
        text: 'Xin kiểm tra lại đường truyền hoặc liên hệ với chúng tôi',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Tắt Thông Báo',
      });
    });

  }

}
