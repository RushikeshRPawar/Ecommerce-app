import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product: IProduct;
quantity = 1;
  constructor(private shoppingService: ShopService, private activatedRoute: ActivatedRoute
            , private bcService: BreadcrumbService, private basketService: BasketService) {
              this.bcService.set('@productDetails', ''); // to avoid displaying ID of product when loading
             }

  ngOnInit(): void {
    this.loadProductDetails();
  }

  increamentProductQuantity(): void {
    this.quantity ++;
  }

  decreamentProductQuantity(): void {
    if (this.quantity > 1) {
      this.quantity --;
    }
  }

  addItemToBasket(): void {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  loadProductDetails(): void
  {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shoppingService.getProductById(+id).subscribe(
       p => {
         this.product = p;
         this.bcService.set('@productDetails', p.name);
       }, error => {
         console.log(error);
       }
    );
  }

}
