import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { BaseComponent } from 'src/app/sales/base/base.model';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends BaseComponent implements OnInit {

  constructor(stateService: StateService) {
    super(stateService, true);
  }

  ngOnInit() {
  }

}
