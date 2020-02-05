import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../../services/state.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WatchModel } from 'src/app/sales/models/watch.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isChangeStyleHeader: boolean;
  constructor(private stateService: StateService, private productService: ProductService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    this.stateService.isChangeStyleHeader.subscribe((status: boolean) => {
      this.isChangeStyleHeader = status;
    });
  }

  ngOnDestroy() {

  }

  searchText(text: string) {
    this.ngxLoader.startBackground();

    this.productService.getProductsBySearch({ searchText: text }).subscribe((response: WatchModel[]) => {
      if (response.length === 0) {
        Swal.fire({
          title: 'Thông Báo',
          text: 'Không có sản phẩm trong khoản mục này, xin vui lòng liên hệ với chúng tôi',
          icon: 'info',
          showCancelButton: false,
          confirmButtonText: 'Tắt Thông Báo',
        });
      } else {

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

}
