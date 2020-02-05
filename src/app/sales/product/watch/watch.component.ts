import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { StateService } from '../../../services/state.service';
import { WatchModel } from '../../models/watch.model';
import { BaseComponent } from '../../base/base.model';
import { ParamsForQuery } from '../../models/params-to-filter.enum';
import { Filter } from '../../models/filter.model';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as $ from 'jquery';
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
  filter = new Filter();
  colourRange = [];
  currentActiveBtn = 0;
  currentActiveShortByOther = 0;
  currentActiveShortByPrice = 0;
  currentActiveColour = [];
  isShowClearFilter = false;
  constructor(private productService: ProductService, stateService: StateService, private ngxLoader: NgxUiLoaderService) {
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

  buildParamsForQuery(paramOptions?: any, paramToFilter?: ParamsForQuery): Filter {
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
        if (paramOptions[0] !== 0 && paramOptions[1] === 0) {
          paramOptions[1] = 500000000;
        }
        if (paramOptions.length !== 0) {
          this.filter.find.price = { $gte: paramOptions[0], $lte: paramOptions[1] };
        } else {
          delete this.filter.find.price;
        }
        break;
      case ParamsForQuery.Colour:
        this.setColourRange(paramOptions);
        if (this.colourRange.length !== 0) {
          this.filter.find.colour = { $in: this.colourRange };
        } else {
          delete this.filter.find.colour;
        }
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

  // paramOptions is depened on paramForQuery
  // which mean if paramForQuery use for price then paramOptions also use for that supposed
  excuteFilter(paramOptions?: any, paramForQuery?: ParamsForQuery) {
    this.ngxLoader.startBackground();
    this.isShowClearFilter = true;
    const filterObj = this.buildParamsForQuery(paramOptions, paramForQuery);

    this.productService.getProductsByFilter(filterObj).subscribe((response: WatchModel[]) => {
      if (response.length === 0) {
        Swal.fire({
          title: 'Thông Báo',
          text: 'Không có sản phẩm trong khoản mục này, xin vui lòng liên hệ với chúng tôi',
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
      this.ngxLoader.stopBackground();
    }, () => {
      this.ngxLoader.stopBackground();
    });

  }

  setColourRange(colour: string) {
    const checkExistData = this.colourRange.filter((item, index) => this.colourRange.indexOf(item) !== index);
    if (checkExistData.length === 0 && this.colourRange.indexOf(colour) === -1) {
      this.colourRange.push(colour);
    } else {
      const clearDuplicateData = this.colourRange.filter((value, index) => {
        return value !== colour;
      });
      this.colourRange = clearDuplicateData;
    }
  }

  clearFilter() {
    this.filter = new Filter();
    this.colourRange = [];
    this.currentActiveBtn = 0;
    this.currentActiveShortByOther = 0;
    this.currentActiveShortByPrice = 0;
    this.currentActiveColour = [];
    $('.js-show-filter').removeClass('show-filter');
    $('.panel-filter').slideUp(400);
    this.excuteFilter();
    this.isShowClearFilter = false;
  }

  isActiveColourInRange(colour): boolean {
    return this.colourRange.filter((item, index) => this.colourRange.indexOf(item) !== index).length > 0;
  }



}
