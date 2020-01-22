import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WatchModel } from '../sales/models/watch.model';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getProduct(): Observable<WatchModel[]> {
    return this.httpClient.get<WatchModel[]>('/api/products');
  }

  addProduct(product: WatchModel): Observable<WatchModel> {
    return this.httpClient.post<WatchModel>('/api/product/add', product , this.httpOptions);
  }

}
