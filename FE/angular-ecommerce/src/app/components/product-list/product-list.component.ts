import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  _destroy = new Subject()
  
  constructor(private ProductService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    })
  }

  listProduct() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProduct();
    }
  }

  handleListProduct() {

    // check if "id" parameter is available
    const hadCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hadCategoryId) {
      //get the "id" param string. convert string to a number using + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // not category found --> innit default value == 1
      this.currentCategoryId = 1;
    }

    // Check if we have a different category than previous
    //resuse a componenet if it is currently being viewed

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);



    //get product by category id
    this.ProductService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId).subscribe(
        data => {
          this.products = data._embedded.products;
          this.thePageNumber = data.page.number + 1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;
        }
      );
  }
  handleSearchProducts() {
    const theKeyWord: string = this.route.snapshot.paramMap.get('keyword')!;
    // search for the products using keyword
    this.ProductService.searchProducts(theKeyWord).pipe(takeUntil(this._destroy)).subscribe(
      data => {
        this.products = data;
      }
    )
  }
  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

  ngOnDestroy(): void {
    this._destroy.unsubscribe();
  }
}
