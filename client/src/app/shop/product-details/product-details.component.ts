import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product: IProduct;
  constructor(private shoppingService: ShopService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails(): void
  {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shoppingService.getProductById(+id).subscribe(
       p => {
         this.product = p;
       }, error => {
         console.log(error);
       }
    );
  }

}
