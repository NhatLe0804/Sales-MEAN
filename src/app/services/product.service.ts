import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WatchModel } from '../sales/models/watch.model';
import { Filter } from '../sales/models/filter.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient) { }

  getProduct(): Observable<WatchModel[]> {
    return this.httpClient.get<WatchModel[]>('/api/products');
  }

  getProductById(id: string): Observable<WatchModel> {
    return this.httpClient.get<WatchModel>(`/api/product/${id}`);
  }

  addProduct(product: WatchModel): Observable<WatchModel> {
    return this.httpClient.post<WatchModel>('/api/product/add', product);
  }


  getTopSales(): Observable<WatchModel[]> {
    return this.httpClient.get<WatchModel[]>('/api/products-top-sales');
  }

  getProductsNewest(): Observable<WatchModel[]> {
    return this.httpClient.get<WatchModel[]>('/api/products-newest');
  }

  getProductAdvance(): Observable<WatchModel[]> {
    return this.httpClient.get<WatchModel[]>('/api/products-advance');
  }

  getProductsByFilter(filter: Filter): Observable<WatchModel[]> {
    return this.httpClient.post<WatchModel[]>('/api/filter', filter);
  }

  getProductsBySearch(searchText: string): Observable<WatchModel[]> {
    return this.httpClient.post<WatchModel[]>('/api/search', searchText);
  }

}
