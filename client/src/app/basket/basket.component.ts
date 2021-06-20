import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  increamentBasketItem(basketItem: IBasketItem): void {
    this.basketService.increamentBasketItem(basketItem);
  }

  decreamentBasketItem(item: IBasketItem): void {
    this.basketService.decreamentBasketItem(item);
  }

  removeBasketItem(item: IBasketItem): void {
    this.basketService.removeBasketItem(item);
  }

}
