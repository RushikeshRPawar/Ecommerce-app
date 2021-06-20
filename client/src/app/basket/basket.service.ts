import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
import { error } from 'protractor';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotal>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

constructor(private http: HttpClient) { }

  getBasket(id: string): any
  {
    return this.http.get(this.baseUrl + 'basket?id=' + id )
    .pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotal();
      })
    );
  }

  setBasket(basket: IBasket): any{
    return this.http.post(this.baseUrl + 'basket', basket).subscribe(
        (response: IBasket) => {
          this.basketSource.next(response);
          this.calculateTotal();
        }, error => {
          console.log(error);
        }
    );
  }

  increamentBasketItem(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    const foundIndexValue = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundIndexValue].quantity++;
    this.setBasket(basket);
  }

  decreamentBasketItem(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    const foundIndexValue = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundIndexValue].quantity > 1){
      basket.items[foundIndexValue].quantity--;
      this.setBasket(basket);
    } else {
      this.removeBasketItem(item);
    }
  }

  removeBasketItem(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some( bi => bi.id === item.id )){
        basket.items = basket.items.filter( bi => bi.id !== item.id);
        if (basket.items.length > 0) {
          this.setBasket(basket);
        } else {
          this.deleteBasket(basket);
        }
    }
  }

  deleteBasket(basket: IBasket): any {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(
      () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      }, error => {
        console.log(error);
      }
    );
  }

  private calculateTotal(): void{
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((a, b) => b.price * b.quantity + a , 0);
    const total = shipping + subtotal;
    this.basketTotalSource.next({shipping, subtotal, total});
  }

  addItemToBasket(item: IProduct, quantity = 1): void{
    const itemToAdd = this.mapProductToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.CreateBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index =  items.findIndex( i => i.id === itemToAdd.id);
    if (index === -1)
    {
        itemToAdd.quantity = quantity;
        items.push(itemToAdd);
    }
    else{
        items[index].quantity += quantity;
    }
    return items;
  }

 private CreateBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id : item.id,
      productName : item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    };
  }

  getCurrentBasketValue(): IBasket{
    return this.basketSource.value;
  }

}




