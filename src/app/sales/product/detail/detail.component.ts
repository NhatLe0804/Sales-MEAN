import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';
import { WatchModel } from '../../models/watch.model';
import { SubscriptionLike } from 'rxjs';
import { BaseComponent } from '../../base/base.model';
import { StateService } from 'src/app/services/state.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DetailComponent extends BaseComponent
  implements OnInit, OnDestroy {
  private idObservable: SubscriptionLike;
  productDetail: WatchModel;
  slickConfig = {
    arrows: true,
    nextArrow: '<button type="button" class="slick-next">Next</button>',
    prevArrow: '<button type="button" class="slick-prev">Previous</button>',
    cssEase: 'linear',
    fade: true
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    stateService: StateService
  ) {
    super(stateService, true);
  }

  ngOnInit() {
    this.idObservable = this.activatedRoute.paramMap
      .pipe(map(paramMap => paramMap.get('id')))
      .subscribe(idProduct => {
        if (idProduct) {
          this.productService
            .getProductById(idProduct)
            .subscribe((response: WatchModel) => {
              this.productDetail = response;
            });
        } else {
          // return trang 404
          this.router.navigateByUrl('404');
        }
      });
  }

  ngOnDestroy() {
    if (this.idObservable) {
      this.idObservable.unsubscribe();
    }
  }
}
