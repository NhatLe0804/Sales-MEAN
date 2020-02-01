import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isChangeStyleHeader: boolean;
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.isChangeStyleHeader.subscribe((status: boolean) => {
      this.isChangeStyleHeader = status;
    });
  }

  ngOnDestroy() {

  }

}
