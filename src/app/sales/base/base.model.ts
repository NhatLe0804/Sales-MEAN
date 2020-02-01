
import { StateService } from '../../services/state.service';


export class BaseComponent {


  constructor(public stateService: StateService, isChangeStyleHeader) {

    this.stateService.isChangeStyleHeader.next(isChangeStyleHeader);
  }

}

