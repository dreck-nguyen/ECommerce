import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  constructor(private ProductService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    })
  }

listProduct() {
  // check if "id" parameter is available
  const hasCateogryId: boolean = this.route.snapshot.paramMap.has('id');
  if(hasCateogryId) {
    //get the "id" param string. convert string to a number using + symbol
    this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
  } else {
    // not category found --> innit default value == 1
    this.currentCategoryId = 1;
  }
  //get product by category id
    this.ProductService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
