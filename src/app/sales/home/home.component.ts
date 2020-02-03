import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../base/base.model';
import { StateService } from '../../services/state.service';
import { ParamsForQuery } from '../models/params-to-filter.enum';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent extends BaseComponent implements OnInit {
  currentTab = ParamsForQuery.TopSales;
  ParamsToFilter = ParamsForQuery;
  constructor(carouselConfig: NgbCarouselConfig, stateService: StateService) {
    super(stateService, false);
    carouselConfig.interval = 100000;
    carouselConfig.keyboard = false;
    carouselConfig.pauseOnHover = true;
  }

  ngOnInit() {

  }

  activeTab(currentTab: ParamsForQuery) {
    this.currentTab = currentTab;
  }

}
