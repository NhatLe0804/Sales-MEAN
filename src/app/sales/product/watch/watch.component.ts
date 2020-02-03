import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { StateService } from '../../../services/state.service';
import { WatchModel } from '../../models/watch.model';
import { BaseComponent } from '../../base/base.model';
import { ParamsToFilter } from '../../models/params-to-filter.enum';
import { Filter } from '../../models/filter.model';
@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent extends BaseComponent implements OnInit {

  products: WatchModel[];
  @Input() paramsToRunQuery: ParamsToFilter;
  @Input() isShowFilterAndSearch = true;
  ParamsToFilter = ParamsToFilter;
  private filter = new Filter();

  constructor(private productService: ProductService, stateService: StateService) {
    super(stateService, true);
  }

  ngOnInit() {

    // const watchModel: WatchModel = {
    //   additionalImg: ['../../../../assets/img/products/product-detail.png', '../../../../assets/img/products/product-detail-2.png'],
    //   amount: 100,
    //   bought: 20,
    //   category: 'G-SHOCK',
    //   codeProduct: 'GA-110-1ADR',
    //   colour: 'Black',
    //   date: new Date(),
    //   // tslint:disable-next-line:max-line-length
    //   description: 'Có thể nói đồng hồ đeo tay bây giờ không những là công cụ xem thời gian đơn thuần mà còn là món phụ kiện thời trang đẳng cấp cho người sử dụng. Trong những năm gần đây thương hiệu đồng hồ nổi tiếng Casio đến từ Nhật Bản luôn phát triển và cải tiến không ngừng để cho ra mắt những dòng sản phẩm đồng hồ thời trang cao cấp với những thiết kế mới lạ về mẫu mã và chất lượng đỉnh cao. Đồng hồ Casio GA-110-1ADR với thiết kế ngoại hình thể thao, mạnh mẽ đã mang lại ấn tượng sâu sắc cho các quý ông yêu thích thời trang muốn có một phong cách riêng cho chính mình.',
    //   // tslint:disable-next-line:max-line-length
    //   extraDescription: ['Chức năng đếm ngược đây là khoảng cài đặt thời gian bắt đầu đếm ngược từ 1 phút đến 24h, với chức năng này cho phép các vận động viên có thể đo thành tích chạy hay bơi lội mà không cần đến sự trợ giúp của ai.'],
    //   extraInformation: ['Miễn phí vận chuyển trên toàn quốc', 'Bảo hành chính hãng', 'Đổi hàng miễn phí trong 7 ngày khi chưa sử dụng'],
    //   img: '../../../../assets/img/products/dong-ho-gshock.png',
    //   name: 'GA-110-1ADR',
    //   price: 250000000,
    //   trademark: 'G-SHOCK',
    //   userFor: ['Men', 'Women']
    // };

    // this.productService.addProduct(watchModel).subscribe(() => {
    //   console.log('done');
    // });
    this.runQueryByParam();
  }

  runQueryByParam(paramToFilter?: ParamsToFilter) {
    const param = paramToFilter || this.paramsToRunQuery;
    switch (param) {
      case ParamsToFilter.TopSales:
        this.productService.getTopSales().subscribe((response: WatchModel[]) => {
          this.products = response;
        }, (err) => {
          console.log(err);
        });
        break;
      case ParamsToFilter.ProductsNewest:
        this.productService.getProductsNewest().subscribe((response: WatchModel[]) => {
          this.products = response;
        }, (err) => {
          console.log(err);
        });
        break;
      case ParamsToFilter.ProductAdvance:
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

  buildParams(paramToFilter?: ParamsToFilter): Filter {
    switch (paramToFilter) {
      case ParamsToFilter.ForMen:
        this.filter.findByGender = ParamsToFilter.ForMen;
        break;
      case ParamsToFilter.ForWomen:
        this.filter.findByGender = ParamsToFilter.ForWomen;
        break;
      case ParamsToFilter.ForCouple:
        this.filter.findByGender = ParamsToFilter.ForCouple;
        break;
      case ParamsToFilter.Descending:
        this.filter.sortByOthers = ParamsToFilter.Descending;
        break;
      case ParamsToFilter.Ascending:
        this.filter.sortByOthers = ParamsToFilter.Ascending;
        break;
      case ParamsToFilter.Newest:
        this.filter.sortByOthers = ParamsToFilter.Newest;
        break;
      case ParamsToFilter.Popular:
        this.filter.sortByOthers = ParamsToFilter.Popular;
        break;

      default:
        this.filter = new Filter();
        break;
    }

    return this.filter;
  }

  excuteFilter(paramToFilter?: ParamsToFilter) {
    const filterObj = this.buildParams(paramToFilter);

    this.productService.getProductsByFilter(filterObj).subscribe((response: WatchModel[]) => {
      this.products = response;
    }, (err) => {
      console.log(err);
    });

  }

}
