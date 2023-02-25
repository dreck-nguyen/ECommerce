import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) { }
  getProductList(theCategoryId: number): Observable<Product[]> {

    // add new URL for new API base on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponeProducts>(searchUrl).pipe(
      map(respone => respone._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponeProductCategory>(this.categoryUrl).pipe(
      map(respone => respone._embedded.productCategory)
    );
  }
}
interface GetResponeProducts {
  _embedded: {
    products: Product[];
  }
}
interface GetResponeProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
