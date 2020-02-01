import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { BaseComponent } from 'src/app/sales/base/base.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent extends BaseComponent implements OnInit {

  constructor(stateService: StateService) {
    super(stateService, true);
  }

  ngOnInit() {
  }

}
