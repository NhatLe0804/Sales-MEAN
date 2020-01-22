import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service';
import { WatchModel } from '../../models/watch.model';
@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

  constructor(private productServiceService: ProductServiceService) { }

  ngOnInit() {

    const model: WatchModel = {
      name: 'Opan',
      amount: 1,
      codeProduct: 'SFAS',
      colour: 'Red',
      description: 'any thing here',
      price: 500
    };

    this.productServiceService.addProduct(model).subscribe((response) => {
      console.log(response);
    }, (err) => {
      console.log(err);
    });


    this.productServiceService.getProduct().subscribe((response) => {
      console.log(response);
    }, (err) => {
      console.log(err);
    });
  }

}
