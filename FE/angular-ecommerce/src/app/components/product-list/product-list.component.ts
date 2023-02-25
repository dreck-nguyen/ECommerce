import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list-.component.html',  For Text 0.1.0
  // templateUrl: './product-list-table.component.html', For Table 0.1.5
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    this.listProduct();
  }
  listProduct() {
    this.ProductService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
